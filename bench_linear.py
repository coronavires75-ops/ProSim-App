import requests, math, numpy as np
URL='http://127.0.0.1:5000/simulate'
def sim(n, comps, t=0.01, **kw):
    kw.setdefault('uic', True)   # اختبارات الشحن من لحظة التوصيل
    r=requests.post(URL,json=dict(num_nodes=n,t_stop=t,components=comps,**kw)).json()
    if r.get('status')!='success': return None, r
    return r, None
def last(r,k,frac=0.0): v=r['voltages'][k-1]; return v[-1]
def tail(r,k,f=0.5): v=np.array(r['voltages'][k-1]); return v[int(len(v)*f):]
res=[]
def check(name, got, exp, tol):
    ok = got is not None and abs(got-exp)<=tol*max(abs(exp),1e-9)
    res.append(ok); print(('PASS' if ok else 'FAIL'), name, 'got', None if got is None else round(got,5), 'expected', round(exp,5), f'(tol {tol*100:.1f}%)')
V=lambda i,p,**k: dict(id=i,type='VCC',part='V',pins=p,**k)
R=lambda i,p,v: dict(id=i,type='R',part='R',pins=p,val=v)
# 1 divider
r,_=sim(2,[V(1,[1,0],val=12),R(2,[1,2],'1k'),R(3,[2,0],'2k')],0.001); check('divider 12V 1k/2k', last(r,2), 8.0, 0.001)
# 2 RL transient: V=10, R=100, L=100mH  tau=1ms; at t=3ms i=0.1*(1-e^-3) ; Vr
comps=[V(1,[1,0],val=10),dict(id=2,type='L',part='L',pins=[1,2],val='100m'),R(3,[2,0],'100')]
r,_=sim(2,comps,0.003); check('RL v_R(3ms)', last(r,2), 10*(1-math.exp(-3)), 0.01)
# 3 RC charging V=5, 1k,1u, t=1ms=tau => 3.161
r,_=sim(2,[V(1,[1,0],val=5),R(2,[1,2],'1k'),dict(id=3,type='C',part='C',pins=[2,0],val='1u')],0.001); check('RC charge @tau', last(r,2), 5*(1-math.exp(-1)), 0.01)
# 4 LC resonance: L=10m C=10u f0=503.29Hz ; measure freq of oscillation after initial kick by AC source? use RLC ring: skip -> use series RLC AC source at resonance current peak = V/R
f0=1/(2*math.pi*math.sqrt(10e-3*10e-6))
comps=[dict(id=1,type='V',part='AC',pins=[1,0],dc=0,amp=1,freq=f0,wave='sine'),dict(id=2,type='L',part='L',pins=[1,2],val='10m'),dict(id=3,type='C',part='C',pins=[2,3],val='10u'),R(4,[3,0],'10')]
r,_=sim(3,comps,0.06); y=tail(r,3,0.6); check('series RLC resonance Vr peak (=1V)', float(np.max(np.abs(y))), 1.0, 0.03)
# 5 diode: 5V-1k-diode Vd
comps=[V(1,[1,0],val=5),R(2,[1,2],'1k'),dict(id=3,type='D',part='1N4007',pins=[2,0])]
r,_=sim(2,comps,0.001); vd=last(r,2); print('   diode Vd=',round(vd,4),'Id=',round((5-vd)/1000*1000,3),'mA')
check('diode forward 1N4007 Vd in [0.6,0.8]', vd, 0.7, 0.15)
# 6 half-wave rectifier peak
comps=[dict(id=1,type='V',part='AC',pins=[1,0],dc=0,amp=10,freq=50,wave='sine'),dict(id=2,type='D',part='1N4007',pins=[1,2]),R(3,[2,0],'1k')]
r,_=sim(2,comps,0.06); y=tail(r,2,0.3); print('   halfwave Vpk=',round(float(y.max()),3),'min=',round(float(y.min()),3)); check('half-wave peak ~ 10-0.7',float(y.max()),9.3,0.05)
# 7 zener: 12V, 470, zener 5.1
comps=[V(1,[1,0],val=12),R(2,[1,2],'470'),dict(id=3,type='Z',part='1N4733',pins=[0,2],val=5.1)]
r,_=sim(2,comps,0.001); print('   zener node=',round(last(r,2),3)); check('zener 5.1V',last(r,2),5.1,0.05)
# 8 BJT CE: Vcc=12, Rb=100k to base from 12 -> Ib=(12-0.7)/100k=113uA ; beta=200 -> Ic=22.6mA ; Rc=470 -> Vc=12-10.6=1.37 (saturating? Vce=1.37 ok active)
comps=[V(1,[1,0],val=12),R(2,[1,2],'100k'),R(3,[1,3],'470'),dict(id=4,type='Q',part='2N2222',pins=[2,3,0],pol='NPN',bf=200,Is=1.4e-14,br=4.0,vaf=100.0)]
r,_=sim(3,comps,0.001); print('   BJT Vb=',round(last(r,2),3),'Vc=',round(last(r,3),3)); check('BJT Vc (beta=200) ~1.4V',last(r,3),1.37,0.25)
# 9 inverting opamp gain -10: Vin 0.5V, Rin 1k, Rf 10k
comps=[V(1,[1,0],val=0.5),R(2,[1,2],'1k'),R(3,[2,3],'10k'),dict(id=4,type='OP',part='LM741',pins=[0,2,3])]
r,_=sim(3,comps,0.001); print('   op-amp out=',round(last(r,3),3)); check('inverting amp -5V',last(r,3),-5.0,0.05)
# 10 bridge rectifier + cap: AC 12Vrms->17Vpk (via direct source), Cfilt 1000u, R 100
comps=[dict(id=1,type='V',part='AC',pins=[1,2],dc=0,amp=17,freq=50,wave='sine'),dict(id=2,type='BRIDGE',part='KBP',pins=[1,2,3,0]),dict(id=3,type='CELEC',part='C',pins=[3,0],val='1000u'),R(4,[3,0],'100')]
r,_=sim(3,comps,0.12); y=tail(r,3,0.5); print('   bridge out min/max',round(float(y.min()),2),round(float(y.max()),2)); check('bridge peak ~17-1.4',float(y.max()),15.6,0.08)
print(f'{sum(res)}/{len(res)} passed')
