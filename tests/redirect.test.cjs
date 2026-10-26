const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const code=fs.readFileSync('dist/app.js','utf8');
const handler=code.slice(code.indexOf('const streamOrigins='),code.indexOf("$('student-form').addEventListener"));
function run(url,origin='https://staging.billing.streampay.sa',validSource=true){
 const frame={contentWindow:{},src:'unchanged'};
 const loading={hidden:true,querySelector:()=>({textContent:''})};
 const elements={'checkout-frame':frame,'payment-loading':loading};
 let listener,redirect;
 const context={URL,Set,Number,Error,$:id=>elements[id],text:a=>a,window:{addEventListener:(name,fn)=>listener=fn,location:{assign:value=>redirect=value}}};
 vm.runInNewContext(handler,context);
 listener({source:validSource?frame.contentWindow:{},origin,data:{type:'stream:redirect',url}});
 assert.equal(frame.src,'unchanged');
 return {redirect,loading};
}
const auth='https://api.moyasar.com/v1/transaction_auths/test-id/form';
assert.equal(run(auth).redirect,auth);
const native=run('https://staging.billing.streampay.sa/result?embed=true&embed_domain=test&status=paid').redirect;
assert.equal(new URL(native).searchParams.get('language'),'ar');
assert.equal(new URL(native).searchParams.has('embed'),false);
assert.equal(new URL(native).searchParams.has('embed_domain'),false);
assert.equal(new URL(native).searchParams.get('status'),'paid');
for(const url of ['http://api.moyasar.com/v1/transaction_auths/test','https://api.moyasar.com/evil','https://evil.example/result','https://user:pass@staging.billing.streampay.sa/result','https://api.moyasar.com/v1/transaction_auths/test#evil'])assert.equal(run(url).redirect,undefined);
assert.equal(run(auth,'https://evil.example').redirect,undefined);
assert.equal(run(auth,undefined,false).redirect,undefined);
console.log('Redirect checks passed: full-page handoff, Arabic, embed removal, origin/source/path guards.');
