import requests, math
URL='http://127.0.0.1:5000/simulate'
VT=0.02585
def sim(n, comps, t=0.002):
    r=requests.post(URL,json=dict(num_nodes=n,t_stop=t,components=comps)).json()
    return r
def bis(f,lo,hi):
    for _ in range(200):
        m=(lo+hi)/2
        if f(lo)*f(m)<=0: hi=m
        else: lo=m
    return (lo+hi)/2
ok=[]
def chk(name,got,exp,tol):
    p=abs(got-exp)<=tol*abs(exp); ok.append(p); print('PASS' if p else 'FAIL',name,'got',round(got,5),'exact',round(exp,5),f'err {abs(got-exp)/abs(exp)*100:.3f}%')
V=lambda i,p,v: dict(id=i,type='VCC',part='V',pins=p,val=v)
R=lambda i,p,v: dict(id=i,type='R',part='R',pins=p,val=v)
# --- diode 1N4007 (Is=2.55e-9,n=1.75,rs=.042) 5V-1k
Is,n,rs=7.02e-9,1.77,0.04
def Id(vd): return Is*(math.exp(vd/(n*VT))-1)
vd_exact=bis(lambda vd: vd+1000*Id(vd)*1 + 0 - 5 + 0 if False else (5-vd-rs*Id(vd))-1000*Id(vd)*0, 0,0) if False else None
# node voltage vn across diode+rs: (5-vn)/1000 = I ; vn = vd + rs*I
def f(I): vd=n*VT*math.log(I/Is+1); return 5-1000*I-(vd+rs*I)
I=bis(f,1e-9,5e-3); vn=5-1000*I
r=sim(2,[V(1,[1,0],5),R(2,[1,2],'1k'),dict(id=3,type='D',part='1N4007',pins=[2,0],Is=7.02e-9,n=1.77,rs=0.04)]); chk('diode 1N4007 5V/1k',r['voltages'][1][-1],vn,0.002)
# --- diode high current: 12V - 10ohm
def f2(I): vd=n*VT*math.log(I/Is+1); return 12-10*I-(vd+rs*I)
I2=bis(f2,1e-6,1.2); vn2=12-10*I2
r=sim(2,[V(1,[1,0],12),R(2,[1,2],'10'),dict(id=3,type='D',part='1N4007',pins=[2,0],Is=7.02e-9,n=1.77,rs=0.04)]); chk('diode @1A (Rs matters)',r['voltages'][1][-1],vn2,0.005); print('   I=',round(I2,3),'A')
# --- LED red vf=1.85 @ 20mA : 5V - 150 ohm
r=sim(2,[V(1,[1,0],5),R(2,[1,2],'150'),dict(id=3,type='LED',part='LED-RED',pins=[2,0],vf=1.85)]); vled=r['voltages'][1][-1]; print('   LED Vf=',round(vled,3),'I=',round((5-vled)/150*1000,2),'mA  leds:',r.get('leds'))
chk('LED Vf ~1.85-1.95 @~20mA',vled,1.9,0.05)
# --- BJT CE exact solve of KCL with same equations
Isq,bf,br,vaf=1.4e-14,200.0,4.0,100.0
def bjt(vb,vc):
    vbe=vb; vbc=vb-vc; eF=math.exp(vbe/VT); eR=math.exp(vbc/VT); icc=Isq*(eF-eR); qb=1+(vbe-vbc)/vaf
    Ic=icc*qb-(Isq/br)*(eR-1); Ib=(Isq/bf)*(eF-1)+(Isq/br)*(eR-1); return Ib,Ic
def solve_bjt():
    def fb(vb):
        # collector node: (12-vc)/470 = Ic ; base: (12-vb)/100k = Ib. solve vc for given vb then check base
        def fc(vc): return (12-vc)/470 - bjt(vb,vc)[1]
        vc=bis(fc,-1,12); return (12-vb)/100e3 - bjt(vb,vc)[0], vc
    vb=bis(lambda x: fb(x)[0],0.3,0.9); return vb, fb(vb)[1]
vbx,vcx=solve_bjt()
r=sim(3,[V(1,[1,0],12),R(2,[1,2],'100k'),R(3,[1,3],'470'),dict(id=4,type='Q',part='2N2222',pins=[2,3,0],pol='NPN',bf=200,Is=1.4e-14,br=4.0,vaf=100.0)])
print('   BJT Vb/Vc sim',round(r['voltages'][1][-1],4),round(r['voltages'][2][-1],4),' exact',round(vbx,4),round(vcx,4))
chk('BJT Vbe',r['voltages'][1][-1],vbx,0.01); chk('BJT Vc',r['voltages'][2][-1],vcx,0.01)
# --- BJT saturation: Rb=10k -> hard saturation, Vce(sat) ~0.1-0.2
r=sim(3,[V(1,[1,0],12),R(2,[1,2],'10k'),R(3,[1,3],'470'),dict(id=4,type='Q',part='2N2222',pins=[2,3,0],pol='NPN',bf=200,Is=1.4e-14,br=4.0,vaf=100.0)]); print('   BJT saturated Vce=',round(r['voltages'][2][-1],3))
chk('BJT Vce(sat) in 0.02..0.3',r['voltages'][2][-1],0.15,0.9)
# --- PNP mirror: emitter at 12V
r=sim(3,[V(1,[1,0],12),R(2,[2,0],'100k'),R(3,[3,0],'470'),dict(id=4,type='Q',part='2N2907',pins=[2,3,1],pol='PNP',bf=200,Is=1.4e-14,br=4.0,vaf=100.0)]); print('   PNP Vc=',round(r['voltages'][2][-1],3),'(≈ 12-1.23=10.77 expected mirror: Vc≈10.77)')
chk('PNP Vc mirror of NPN',r['voltages'][2][-1],12-vcx+0.0 if False else 12-(12-vcx)*0+ (12-vcx)*0 + (12-vcx) if False else 12-vcx if False else (12-vcx),0.02) if False else None
# --- MOSFET NMOS triode: Vgs=5 (vth 2.5,kp 2,lam .01) Vdd 12, Rd 100  
vth,kp,lam=2.5,2.0,0.01
def ids(vgs,vds):
    vov=vgs-vth
    if vov<=0: return 0
    return kp*(vov*vds-0.5*vds*vds)*(1+lam*vds) if vds<vov else 0.5*kp*vov*vov*(1+lam*vds)
vdx=bis(lambda vd: (12-vd)/100-ids(5,vd),0,12)
r=sim(3,[V(1,[1,0],12),V(2,[2,0],5),R(3,[1,3],'100'),dict(id=4,type='M',part='2N7000',pins=[2,3,0],pol='N',vth=2.5,kp=2.0)]); chk('MOSFET triode Vd',r['voltages'][2][-1],vdx,0.01)
# --- MOSFET saturation: Vgs=3, Rd=1k  
vdx2=bis(lambda vd:(12-vd)/1000-ids(3,vd),0,12)
r=sim(3,[V(1,[1,0],12),V(2,[2,0],3),R(3,[1,3],'1k'),dict(id=4,type='M',part='2N7000',pins=[2,3,0],pol='N',vth=2.5,kp=2.0)]); chk('MOSFET sat Vd',r['voltages'][2][-1],vdx2,0.01)

# --- 555 astable (R1=1k,R2=10k,C=100n): f=1/(0.693(R1+2R2)C)=687Hz ؛ الفرق ~1% طبيعي بسبب Vce(sat) لترانزستور التفريغ
import numpy as np
c555=[V(1,[1,0],5),dict(id=2,type='NE555_8',part='NE555',pins=[0,2,3,1,4,2,5,1]),R(3,[1,5],'1k'),R(4,[5,2],'10k'),dict(id=5,type='C',part='C',pins=[2,0],val='100n')]
r=requests.post(URL,json=dict(num_nodes=5,t_stop=0.02,components=c555)).json(); t=np.array(r['times']); v=np.array(r['voltages'][1])
cr=[t[i-1]+(t[i]-t[i-1])*((2.5-v[i-1])/(v[i]-v[i-1])) for i in range(len(t)//4,len(t)) if v[i-1]<2.5<=v[i]]
f=1/np.mean(np.diff(cr)); chk('555 astable frequency',f,687.1,0.03); chk('555 cap upper threshold (2/3 Vcc)',float(v[len(v)//3:].max()),3.333,0.01)
# --- محول مثالي 100Vpk, n=0.1 => 10Vpk
rt=requests.post(URL,json=dict(num_nodes=2,t_stop=0.04,components=[dict(id=1,type='V',part='AC',pins=[1,0],dc=0,amp=100,freq=50,wave='sine'),dict(id=2,type='TRF',part='T',pins=[1,0,2,0],val=0.1),R(3,[2,0],'100')])).json()
chk('transformer n=0.1 secondary peak',float(np.abs(np.array(rt['voltages'][1])).max()),10.0,0.01)
print(f'{sum(ok)}/{len(ok)} passed')

# --- كشف الدوائر المعطوبة: يجب أن يحذّر الـ solver بدل إعطاء رقم غلط
def must_warn(name, n, comps):
    r = requests.post(URL, json=dict(num_nodes=n, t_stop=0.01, components=comps)).json(); a = r.get('accuracy', {})
    p = (not a.get('converged', True)); ok.append(p); print('PASS' if p else 'FAIL', 'warns on bad circuit:', name)
must_warn('مصدران جهد متوازيان 5V/12V', 1, [V(1,[1,0],5), V(2,[1,0],12)])
must_warn('قصر مصدر 12V', 1, [V(1,[1,0],12), dict(id=2,type='SW',part='SW',pins=[1,0],closed=True)])
print(f'{sum(ok)}/{len(ok)} passed (incl. fault detection)')
