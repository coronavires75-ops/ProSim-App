import requests, numpy as np
URL='http://127.0.0.1:5000/simulate'
def sim(n, comps, t=0.01):
    return requests.post(URL,json=dict(num_nodes=n,t_stop=t,components=comps,verify=False)).json()
V=lambda i,p,v: dict(id=i,type='VCC',part='V',pins=p,val=v)
R=lambda i,p,v: dict(id=i,type='R',part='R',pins=p,val=v)
CLK=lambda i,p,f: dict(id=i,type='V',part='CLK',pins=p,dc=2.5,amp=2.5,freq=f,wave='square')
ok=[]
def chk(name,cond,info=''):
    ok.append(cond); print('PASS' if cond else 'FAIL',name,info)
# comparator
for vp,vn,exp in ((3.0,1.0,5.0),(1.0,3.0,0.0)):
    r=sim(4,[V(1,[1,0],vp),V(2,[2,0],vn),dict(id=3,type='COMPARATOR',part='LM393',pins=[1,2,3],val=5),R(4,[3,0],'10k')]); y=r['voltages'][2][-1]; chk(f'COMPARATOR {vp}>{vn}',abs(y-exp)<0.2,round(y,3))
# Schmitt: sine in -> square out with hysteresis (inverting)
r=sim(2,[dict(id=1,type='V',part='AC',pins=[1,0],dc=2.5,amp=2.5,freq=200,wave='sine'),dict(id=2,type='SCHMITT',part='74HC14',pins=[1,2],val=5),R(3,[2,0],'10k')],0.02)
y=np.array(r['voltages'][1]); x=np.array(r['voltages'][0]); hi=x>3.0; chk('SCHMITT output toggles',(y.max()>4.5 and y.min()<0.5),f'out range {y.min():.2f}..{y.max():.2f}')
# DFF toggle divider: D=Qbar ; clock 1kHz -> Q freq 500Hz
r=sim(4,[CLK(1,[2,0],1000),dict(id=2,type='DFF',part='7474',pins=[3,2,0,1,3]),R(3,[1,0],'10k'),R(4,[3,0],'1M')],0.02)
q=np.array(r['voltages'][0]); t=np.array(r['times']); cr=[t[i] for i in range(1,len(q)) if q[i-1]<2.5<=q[i]]
f=1/np.mean(np.diff(cr)) if len(cr)>2 else 0; chk('DFF divide-by-2 (1kHz->500Hz)',abs(f-500)<15,f'f={f:.1f}Hz')
# COUNTER4: clock 1kHz for 10ms -> count 10 -> Q0..Q3 = 1010? (value after ~10 rising edges)
r=sim(6,[CLK(1,[1,0],1000),dict(id=2,type='COUNTER4',part='74HC161',pins=[1,0,2,3,4,5]),R(3,[2,0],'10k'),R(4,[3,0],'10k'),R(5,[4,0],'10k'),R(6,[5,0],'10k'),R(7,[1,0],'1M')],0.0105)
bits=[int(r['voltages'][k][-1]>2.5) for k in (1,2,3,4)]; val=sum(b<<i for i,b in enumerate(bits)); chk('COUNTER4 counts clock edges',val in (10,11,9),f'count={val} bits={bits}')
# OPTO: LED 10mA -> output current ~ CTR*10mA
r=sim(4,[V(1,[1,0],5),R(2,[1,2],'370'),dict(id=3,type='OPTO',part='4N35',pins=[2,0,3,0],ctr=1.0),V(4,[4,0],10),R(5,[4,3],'500')],0.002)
vc=r['voltages'][2][-1]; ic=(10-vc)/500; print('   OPTO Vc=',round(vc,3),'Ic=',round(ic*1000,2),'mA (If≈',round((5-r['voltages'][1][-1])/370*1000,2),'mA)')
chk('OPTO transfers current (Ic≈CTR·If, saturating)',0.5e-3<ic<20e-3)
print(sum(ok),'/',len(ok))
