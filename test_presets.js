// يحمّل كل الدوائر الجاهزة ويبني الـ netlist بنفس منطق الواجهة ويرسلها للسيرفر
const fs=require('fs'), vm=require('vm');
const root=process.argv[2]||'.';
const ctx={window:{addEventListener(){}},document:{},console,setInterval(){},setTimeout(){}};
vm.createContext(ctx);
let src=fs.readFileSync(root+'/static/presets_all.js','utf8');
vm.runInContext(src,ctx);
const presets=ctx.window.EXTRA_LECTURE_PRESETS;
function npins(c){const t=c.type;
 if(['GND','VCC','LOGIC_TOGGLE','LM35','HCSR04','LCD16'].includes(t))return 1;
 if(['REG','OP','COMPARATOR','PID','SW_SPDT','Q','M','SCR','TRIAC','AND','OR','NAND','NOR','XOR','XNOR'].includes(t))return 3;
 if(['TRF','BRIDGE','WATTMETER','NE555','OPTO','OPTOTRIAC','RELAY','BCD7','OSC'].includes(t))return 4;
 if(['RELAY_SPDT','DFF','JKFF'].includes(t))return 5;
 if(t==='COUNTER4')return 6; if(t==='NE555_8')return 8;
 if(t==='MOTOR'&&/3PH|PMSM|INDUCTION/i.test(c.part||''))return 3;
 if(t==='MOTOR'&&/STEPPER|NEMA/i.test(c.part||''))return 4;
 return 2;}
(async()=>{
 const only=process.argv[3];
 for(const [name,p] of Object.entries(presets)){
  if(only && !name.startsWith(only)) continue;
  const comps=p.components, wires=p.wires||[];
  const parent={}, k=(a,b)=>a+'_'+b;
  comps.forEach(c=>{for(let i=0;i<npins(c);i++)parent[k(c.id,i)]=k(c.id,i)});
  const find=x=>parent[x]===x?x:(parent[x]=find(parent[x]));
  wires.forEach(w=>{const a=find(k(w.from.compId,w.from.pinIdx)),b=find(k(w.to.compId,w.to.pinIdx));if(a!==b)parent[a]=b;});
  const g=new Set(comps.filter(c=>c.type==='GND').map(c=>find(k(c.id,0))));
  const map={};let idx=1;Object.keys(parent).forEach(key=>{const r=find(key);if(g.has(r))map[r]=0;else if(!(r in map))map[r]=idx++;});
  const net=comps.filter(c=>c.type!=='GND').map(c=>{const {x,y,rot,...r}=c;r.pins=[...Array(npins(c)).keys()].map(i=>map[find(k(c.id,i))]??0);return r;});
  const t0=Date.now();
  const res=await fetch('http://127.0.0.1:5000/simulate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:'transient',num_nodes:idx-1,t_stop:p.tStop||0.04,components:net})});
  const d=await res.json();
  const dt=((Date.now()-t0)/1000).toFixed(1);
  if(d.status!=='success'){console.log('ERROR',name,'|',d.message);continue;}
  const a=d.accuracy; const vmax=Math.max(...d.voltages.map(v=>Math.max(...v.map(Math.abs))));
  console.log((a.converged?'OK  ':'BAD ')+name+' | '+dt+'s | Vmax='+vmax.toFixed(2)+' | unsupported='+JSON.stringify(a.unsupported)+' | warn='+a.warnings.map(w=>w.slice(0,90)).join(' ;; '));
 }
})();
