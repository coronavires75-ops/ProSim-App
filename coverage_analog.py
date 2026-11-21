import requests, math, numpy as np
URL='http://127.0.0.1:5000/simulate'
def sim(n, comps, t=0.005):
    r=requests.post(URL,json=dict(num_nodes=n,t_stop=t,components=comps,verify=False)).json(); return r
def last(r,k): return r['voltages'][k-1][-1]
V=lambda i,p,v: dict(id=i,type='VCC',part='V',pins=p,val=v)
R=lambda i,p,v: dict(id=i,type='R',part='R',pins=p,val=v)
res=[]
def chk(name,got,exp,tol=0.02,absol=1e-3):
    ok = got is not None and (abs(got-exp)<=tol*abs(exp)+absol); res.append((name,ok,got,exp)); print('PASS' if ok else 'FAIL',name,'got',None if got is None else round(got,4),'expected',exp)
def safe(name,f):
    try: f()
    except Exception as e: res.append((name,False,None,None)); print('FAIL',name,'EXC',str(e)[:90])
# I source: 10mA through 1k to ground -> 10V
def t_i():
    r=sim(2,[dict(id=1,type='I',part='ISOURCE-10mA',pins=[0,1],val='10m'),R(2,[1,0],'1k')]); chk('I source 10mA into 1k => +10V',last(r,1),10.0)
safe('I',t_i)
def t_i2():
    r=sim(2,[V(1,[1,0],5),dict(id=2,type='I',part='I',pins=[1,2],val='2m'),R(3,[2,0],'1k')]); chk('I source series with 5V,1k (2mA fixed) => 2V',last(r,2),2.0)
safe('I2',t_i2)
def t_sw():
    for closed,exp in ((True,5.0*1000/1000.01),(False,0.0)):
        r=sim(2,[V(1,[1,0],5),dict(id=2,type='SW',part='SW',pins=[1,2],closed=closed),R(3,[2,0],'1k')]); chk(f'SW closed={closed}',last(r,2),exp,0.01,0.01)
safe('SW',t_sw)
def t_pb():
    for closed,exp in ((True,5.0),(False,0.0)):
        r=sim(2,[V(1,[1,0],5),dict(id=2,type='PUSH_BTN',part='PB',pins=[1,2],closed=closed),R(3,[2,0],'1k')]); chk(f'PUSH_BTN closed={closed}',last(r,2),exp,0.01,0.02)
safe('PB',t_pb)
def t_pot():
    r=sim(2,[V(1,[1,0],10),dict(id=2,type='POT',part='POT',pins=[1,2],val='10k',pct=30),R(3,[2,0],'10k')]); chk('POT 10k@30% in series with 10k => 10*10/(3+10)=7.69V',last(r,2),10*10/13.0,0.01)
safe('POT',t_pot)
def t_fuse():
    r=sim(2,[V(1,[1,0],5),dict(id=2,type='FUSE',part='FUSE-1A',pins=[1,2],val='0.01'),R(3,[2,0],'100')]); chk('FUSE ~0.01ohm',last(r,2),5*100/100.01,0.01)
safe('FUSE',t_fuse)
def t_reg():
    for part,v in (('7805',5.0),('7812',12.0)):
        r=sim(3,[V(1,[1,0],v+5),dict(id=2,type='REG',part=part,pins=[1,0,2],val=v),R(3,[2,0],'100')]); chk(f'REG {part}',last(r,2),v,0.01)
safe('REG',t_reg)
def t_lm35():
    r=sim(1,[dict(id=1,type='LM35',part='LM35',pins=[1],val=25),R(2,[1,0],'100k')]); chk('LM35 @25C => 0.25V',last(r,1),0.25,0.02)
safe('LM35',t_lm35)
def t_relay():
    # coil 12V (pins0,1) drives contact (pins 2,3) between 5V and load
    r=sim(4,[V(1,[1,0],12),V(2,[2,0],5),R(3,[3,0],'1k'),dict(id=4,type='RELAY',part='RELAY-5V',pins=[1,0,2,3],val=12)]); chk('RELAY energized passes 5V',last(r,3),5.0,0.03,0.05)
    r=sim(4,[V(1,[1,0],0.0),V(2,[2,0],5),R(3,[3,0],'1k'),R(5,[1,0],'1k'),dict(id=4,type='RELAY',part='RELAY-5V',pins=[1,0,2,3],val=12)]); chk('RELAY de-energized blocks',last(r,3),0.0,0.03,0.05)
safe('RELAY',t_relay)
def t_comp():
    for vp,vn,exp in ((3.0,1.0,5.0),(1.0,3.0,0.0)):
        r=sim(4,[V(1,[1,0],vp),V(2,[2,0],vn),dict(id=3,type='COMPARATOR',part='LM393',pins=[1,2,3],val=5),R(4,[3,0],'10k')]); chk(f'COMPARATOR {vp}>{vn}',last(r,3),exp,0.05,0.2)
safe('COMP',t_comp)
def t_ldr():
    r=sim(2,[V(1,[1,0],5),dict(id=2,type='LDR',part='LDR',pins=[1,2],val='10k',lux=1000),R(3,[2,0],'10k')]); print('   LDR lux=1000 -> node',round(last(r,2),3),'(val-only model => 2.5)')
safe('LDR',t_ldr)
def t_diac():
    pass
print('\nFAIL count:',sum(1 for r in res if not r[1]),'/',len(res))

# ---- أجهزة القياس الحقيقية ----
r=sim(3,[V(1,[1,0],10),dict(id=2,type='WATTMETER',part='W',pins=[1,0,1,2]),R(3,[2,0],'100')],0.005); chk('WATTMETER DC 10V/100ohm = 1 W',r['powers']['2'],1.0,0.01)
r=sim(3,[dict(id=1,type='V',part='AC',pins=[1,0],dc=0,amp=20,freq=50,wave='sine'),dict(id=2,type='WATTMETER',part='W',pins=[1,0,1,2]),R(3,[2,0],'100')],0.04); chk('WATTMETER AC 20Vpk/100ohm = 2 W',r['powers']['2'],2.0,0.01)
r=sim(3,[V(1,[1,0],10),dict(id=2,type='AMMETER',part='A',pins=[1,2]),R(3,[2,0],'100')],0.005); chk('AMMETER 10V/100ohm = 0.1 A',r['ammeters']['2'],0.1,0.01)
