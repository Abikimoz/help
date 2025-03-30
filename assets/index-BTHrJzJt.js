(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const y=".",V=Symbol("target"),Z=Symbol("unsubscribe");function Q(e){return e instanceof Date||e instanceof Set||e instanceof Map||e instanceof WeakSet||e instanceof WeakMap||ArrayBuffer.isView(e)}function ie(e){return(typeof e=="object"?e===null:typeof e!="function")||e instanceof RegExp}const u=Array.isArray;function P(e){return typeof e=="symbol"}const R={after(e,t){return u(e)?e.slice(t.length):t===""?e:e.slice(t.length+1)},concat(e,t){return u(e)?(e=[...e],t&&e.push(t),e):t&&t.toString!==void 0?(e!==""&&(e+=y),P(t)?e+t.toString():e+t):e},initial(e){if(u(e))return e.slice(0,-1);if(e==="")return e;const t=e.lastIndexOf(y);return t===-1?"":e.slice(0,t)},last(e){if(u(e))return e.at(-1)??"";if(e==="")return e;const t=e.lastIndexOf(y);return t===-1?e:e.slice(t+1)},walk(e,t){if(u(e))for(const r of e)t(r);else if(e!==""){let r=0,n=e.indexOf(y);if(n===-1)t(e);else for(;r<e.length;)n===-1&&(n=e.length),t(e.slice(r,n)),r=n+1,n=e.indexOf(y,r)}},get(e,t){return this.walk(t,r=>{e&&(e=e[r])}),e},isSubPath(e,t){if(u(e)){if(e.length<t.length)return!1;for(let r=0;r<t.length;r++)if(e[r]!==t[r])return!1;return!0}return e.length<t.length?!1:e===t?!0:e.startsWith(t)?e[t.length]===y:!1},isRootPath(e){return u(e)?e.length===0:e===""}};function pe(e){return typeof e=="object"&&typeof e.next=="function"}function de(e,t,r,n,s){const a=e.next;if(t.name==="entries")e.next=function(){const i=a.call(this);return i.done===!1&&(i.value[0]=s(i.value[0],t,i.value[0],n),i.value[1]=s(i.value[1],t,i.value[0],n)),i};else if(t.name==="values"){const i=r[V].keys();e.next=function(){const h=a.call(this);return h.done===!1&&(h.value=s(h.value,t,i.next().value,n)),h}}else e.next=function(){const i=a.call(this);return i.done===!1&&(i.value=s(i.value,t,i.value,n)),i};return e}function G(e,t,r){return e.isUnsubscribed||t.ignoreSymbols&&P(r)||t.ignoreUnderscores&&r.charAt(0)==="_"||"ignoreKeys"in t&&t.ignoreKeys.includes(r)}class le{constructor(t){this._equals=t,this._proxyCache=new WeakMap,this._pathCache=new WeakMap,this.isUnsubscribed=!1}_getDescriptorCache(){return this._descriptorCache===void 0&&(this._descriptorCache=new WeakMap),this._descriptorCache}_getProperties(t){const r=this._getDescriptorCache();let n=r.get(t);return n===void 0&&(n={},r.set(t,n)),n}_getOwnPropertyDescriptor(t,r){if(this.isUnsubscribed)return Reflect.getOwnPropertyDescriptor(t,r);const n=this._getProperties(t);let s=n[r];return s===void 0&&(s=Reflect.getOwnPropertyDescriptor(t,r),n[r]=s),s}getProxy(t,r,n,s){if(this.isUnsubscribed)return t;const a=t[s],i=a??t;this._pathCache.set(i,r);let h=this._proxyCache.get(i);return h===void 0&&(h=a===void 0?new Proxy(t,n):t,this._proxyCache.set(i,h)),h}getPath(t){return this.isUnsubscribed?void 0:this._pathCache.get(t)}isDetached(t,r){return!Object.is(t,R.get(r,this.getPath(t)))}defineProperty(t,r,n){return Reflect.defineProperty(t,r,n)?(this.isUnsubscribed||(this._getProperties(t)[r]=n),!0):!1}setProperty(t,r,n,s,a){if(!this._equals(a,n)||!(r in t)){const i=this._getOwnPropertyDescriptor(t,r);return i!==void 0&&"set"in i?Reflect.set(t,r,n,s):Reflect.set(t,r,n)}return!0}deleteProperty(t,r,n){if(Reflect.deleteProperty(t,r)){if(!this.isUnsubscribed){const s=this._getDescriptorCache().get(t);s&&(delete s[r],this._pathCache.delete(n))}return!0}return!1}isSameDescriptor(t,r,n){const s=this._getOwnPropertyDescriptor(r,n);return t!==void 0&&s!==void 0&&Object.is(t.value,s.value)&&(t.writable||!1)===(s.writable||!1)&&(t.enumerable||!1)===(s.enumerable||!1)&&(t.configurable||!1)===(s.configurable||!1)&&t.get===s.get&&t.set===s.set}isGetInvariant(t,r){const n=this._getOwnPropertyDescriptor(t,r);return n!==void 0&&n.configurable!==!0&&n.writable!==!0}unsubscribe(){this._descriptorCache=null,this._pathCache=null,this._proxyCache=null,this.isUnsubscribed=!0}}function B(e){return toString.call(e)==="[object Object]"}function M(){return!0}function A(e,t){return e.length!==t.length||e.some((r,n)=>t[n]!==r)}const ee=new Set(["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]),he=new Set(["concat","includes","indexOf","join","keys","lastIndexOf"]),te={push:M,pop:M,shift:M,unshift:M,copyWithin:A,reverse:A,sort:A,splice:A,flat:A,fill:A},fe=new Set([...ee,...he,...Object.keys(te)]);function N(e,t){if(e.size!==t.size)return!0;for(const r of e)if(!t.has(r))return!0;return!1}const re=["keys","values","entries"],ne=new Set(["has","toString"]),se={add:N,clear:N,delete:N,forEach:N},me=new Set([...ne,...Object.keys(se),...re]);function E(e,t){if(e.size!==t.size)return!0;let r;for(const[n,s]of e)if(r=t.get(n),r!==s||r===void 0&&!t.has(n))return!0;return!1}const ue=new Set([...ne,"get"]),oe={set:E,clear:E,delete:E,forEach:E},Re=new Set([...ue,...Object.keys(oe),...re]);class _{constructor(t,r,n,s){this._path=r,this._isChanged=!1,this._clonedCache=new Set,this._hasOnValidate=s,this._changes=s?[]:null,this.clone=r===void 0?t:this._shallowClone(t)}static isHandledMethod(t){return ee.has(t)}_shallowClone(t){let r=t;if(B(t))r={...t};else if(u(t)||ArrayBuffer.isView(t))r=[...t];else if(t instanceof Date)r=new Date(t);else if(t instanceof Set)r=new Set([...t].map(n=>this._shallowClone(n)));else if(t instanceof Map){r=new Map;for(const[n,s]of t.entries())r.set(n,this._shallowClone(s))}return this._clonedCache.add(r),r}preferredThisArg(t,r,n,s){return t?(u(s)?this._onIsChanged=te[r]:s instanceof Set?this._onIsChanged=se[r]:s instanceof Map&&(this._onIsChanged=oe[r]),s):n}update(t,r,n){const s=R.after(t,this._path);if(r!=="length"){let a=this.clone;R.walk(s,i=>{a!=null&&a[i]&&(this._clonedCache.has(a[i])||(a[i]=this._shallowClone(a[i])),a=a[i])}),this._hasOnValidate&&this._changes.push({path:s,property:r,previous:n}),a!=null&&a[r]&&(a[r]=n)}this._isChanged=!0}undo(t){let r;for(let n=this._changes.length-1;n!==-1;n--)r=this._changes[n],R.get(t,r.path)[r.property]=r.previous}isChanged(t){return this._onIsChanged===void 0?this._isChanged:this._onIsChanged(this.clone,t)}isPathApplicable(t){return R.isRootPath(this._path)||R.isSubPath(t,this._path)}}class j extends _{static isHandledMethod(t){return fe.has(t)}}class be extends _{undo(t){t.setTime(this.clone.getTime())}isChanged(t,r){return!r(this.clone.valueOf(),t.valueOf())}}class K extends _{static isHandledMethod(t){return me.has(t)}undo(t){for(const r of this.clone)t.add(r);for(const r of t)this.clone.has(r)||t.delete(r)}}class Y extends _{static isHandledMethod(t){return Re.has(t)}undo(t){for(const[r,n]of this.clone.entries())t.set(r,n);for(const r of t.keys())this.clone.has(r)||t.delete(r)}}class we extends _{constructor(t,r,n,s){super(void 0,r,n,s),this._argument1=n[0],this._weakValue=t.has(this._argument1)}isChanged(t){return this._weakValue!==t.has(this._argument1)}undo(t){this._weakValue&&!t.has(this._argument1)?t.add(this._argument1):t.delete(this._argument1)}}class Se extends _{constructor(t,r,n,s){super(void 0,r,n,s),this._weakKey=n[0],this._weakHas=t.has(this._weakKey),this._weakValue=t.get(this._weakKey)}isChanged(t){return this._weakValue!==t.get(this._weakKey)}undo(t){const r=t.has(this._weakKey);this._weakHas&&!r?t.set(this._weakKey,this._weakValue):!this._weakHas&&r?t.delete(this._weakKey):this._weakValue!==t.get(this._weakKey)&&t.set(this._weakKey,this._weakValue)}}class k{constructor(t){this._stack=[],this._hasOnValidate=t}static isHandledType(t){return B(t)||u(t)||Q(t)}static isHandledMethod(t,r){return B(t)?_.isHandledMethod(r):u(t)?j.isHandledMethod(r):t instanceof Set?K.isHandledMethod(r):t instanceof Map?Y.isHandledMethod(r):Q(t)}get isCloning(){return this._stack.length>0}start(t,r,n){let s=_;u(t)?s=j:t instanceof Date?s=be:t instanceof Set?s=K:t instanceof Map?s=Y:t instanceof WeakSet?s=we:t instanceof WeakMap&&(s=Se),this._stack.push(new s(t,r,n,this._hasOnValidate))}update(t,r,n){this._stack.at(-1).update(t,r,n)}preferredThisArg(t,r,n){const{name:s}=t,a=k.isHandledMethod(n,s);return this._stack.at(-1).preferredThisArg(a,s,r,n)}isChanged(t,r,n){return this._stack.at(-1).isChanged(t,r,n)}isPartOfClone(t){return this._stack.at(-1).isPathApplicable(t)}undo(t){this._previousClone!==void 0&&this._previousClone.undo(t)}stop(){return this._previousClone=this._stack.pop(),this._previousClone.clone}}const qe={equals:Object.is,isShallow:!1,pathAsArray:!1,ignoreSymbols:!1,ignoreUnderscores:!1,ignoreDetached:!1,details:!1},U=(e,t,r={})=>{r={...qe,...r};const n=Symbol("ProxyTarget"),{equals:s,isShallow:a,ignoreDetached:i,details:h}=r,p=new le(s),q=typeof r.onValidate=="function",m=new k(q),g=(o,c,d,l,f)=>!q||m.isCloning||r.onValidate(R.concat(p.getPath(o),c),d,l,f)===!0,$=(o,c,d,l)=>{!G(p,r,c)&&!(i&&p.isDetached(o,e))&&v(p.getPath(o),c,d,l)},v=(o,c,d,l,f)=>{m.isCloning&&m.isPartOfClone(o)?m.update(o,c,l):t(R.concat(o,c),d,l,f)},C=o=>o&&(o[n]??o),T=(o,c,d,l)=>{if(ie(o)||d==="constructor"||a&&!k.isHandledMethod(c,d)||G(p,r,d)||p.isGetInvariant(c,d)||i&&p.isDetached(c,e))return o;l===void 0&&(l=p.getPath(c));const f=R.concat(l,d),b=p.getPath(o);return b&&ae(f,b)?p.getProxy(o,b,H,n):p.getProxy(o,f,H,n)},ae=(o,c)=>{if(P(o)||o.length<=c.length||u(c)&&c.length===0)return!1;const d=u(o)?o:o.split(y),l=u(c)?c:c.split(y);return d.length<=l.length?!1:!l.some((f,b)=>f!==d[b])},H={get(o,c,d){if(P(c)){if(c===n||c===V)return o;if(c===Z&&!p.isUnsubscribed&&p.getPath(o).length===0)return p.unsubscribe(),o}const l=Q(o)?Reflect.get(o,c):Reflect.get(o,c,d);return T(l,o,c)},set(o,c,d,l){d=C(d);const f=o[n]??o,b=f[c];if(s(b,d)&&c in o)return!0;const w=g(o,c,d,b);return w&&p.setProperty(f,c,d,l,b)?($(o,c,o[c],b),!0):!w},defineProperty(o,c,d){if(!p.isSameDescriptor(d,o,c)){const l=o[c];g(o,c,d.value,l)&&p.defineProperty(o,c,d,l)&&$(o,c,d.value,l)}return!0},deleteProperty(o,c){if(!Reflect.has(o,c))return!0;const d=Reflect.get(o,c),l=g(o,c,void 0,d);return l&&p.deleteProperty(o,c,d)?($(o,c,void 0,d),!0):!l},apply(o,c,d){const l=c[n]??c;if(p.isUnsubscribed)return Reflect.apply(o,l,d);if((h===!1||h!==!0&&!h.includes(o.name))&&k.isHandledType(l)){let f=R.initial(p.getPath(o));const b=k.isHandledMethod(l,o.name);m.start(l,f,d);let w=Reflect.apply(o,m.preferredThisArg(o,c,l),b?d.map(I=>C(I)):d);const ce=m.isChanged(l,s),F=m.stop();if(k.isHandledType(w)&&b&&(c instanceof Map&&o.name==="get"&&(f=R.concat(f,d[0])),w=p.getProxy(w,f,H)),ce){const I={name:o.name,args:d,result:w},W=m.isCloning?R.initial(f):f,z=m.isCloning?R.last(f):"";g(R.get(e,W),z,l,F,I)?v(W,z,l,F,I):m.undo(l)}return(c instanceof Map||c instanceof Set)&&pe(w)?de(w,o,c,f,T):w}return Reflect.apply(o,c,d)}},x=p.getProxy(e,r.pathAsArray?[]:"",H);return t=t.bind(x),q&&(r.onValidate=r.onValidate.bind(x)),x};U.target=e=>(e==null?void 0:e[V])??e;U.unsubscribe=e=>(e==null?void 0:e[Z])??e;const S=e=>e.split(".").slice(0,3).reverse().join("."),ge=e=>Array(4).fill(0).map((r,n)=>256-2**(8-Math.min(8,Math.max(0,e-n*8)))).join("."),ye=e=>{const t=e.split(".").map(Number),r=t[3]+3;return t[3]=r,t.join(".")},L=e=>e.split(".")[3],_e=({devices:e})=>`
<p>Запуск ISP</p>
<p>Login <code>root</code></p>
<p>Password <code>toor</code></p>
<p><code>hostnamectl hostname ISP ; exec bash</code></p>
<p>Накатываем обновления</p>
<p><code>apt-get update</code></p>
<p><code>apt-get install -y NetworkManager-tui iptables</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<p><code>nmtui</code></p>
<p>настраиваем два интерфейса:</p>
<p>Имя профиля: <code>HQ-RTR</code></p>
<p>${e.isp.interfaces.hqRtr.name}: <code>${e.isp.interfaces.hqRtr.ip}/${e.isp.interfaces.hqRtr.mask}</code></p>
<p>Имя профиля: <code>BR-RTR</code></p>
<p>${e.isp.interfaces.brRtr.name}: <code>${e.isp.interfaces.brRtr.ip}/${e.isp.interfaces.brRtr.mask}</code></p>
<p>проверяем:</p>
<p><code>ip -br a</code></p>
<p>настраиваем маршрутизацию</p>
<p>меняем 0 на 1 в forward:</p>
<p><code>sed -i 's/^net\\.ipv4\\.ip_forward *= *.*/net.ipv4.ip_forward = 1/' /etc/net/sysctl.conf</code></p>
<p><code>systemctl restart network</code></p>
<p>настраиваем nat</p>
<p><code>iptables -t nat -j MASQUERADE -A POSTROUTING -o ens18</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now</code></p>
<br>
<p>Запуск HQ-RTR</p>
<p><code>hostnamectl hostname HQ-RTR.au-team.irpo ; exec bash</code></p>
<p>Настраиваем статичный IP и iptables</p>
<p><pre><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/options
echo '${e.hqRtr.interfaces.isp.ip}/${e.hqRtr.interfaces.isp.mask}' > /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/ipv4address
echo 'default via ${e.isp.interfaces.hqRtr.ip}' > /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/ipv4route
echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/resolv.conf
sed -i 's/^net\\.ipv4\\.ip_forward *= *.*/net.ipv4.ip_forward = 1/' /etc/net/sysctl.conf
iptables -t nat -j MASQUERADE -A POSTROUTING
iptables-save > /etc/sysconfig/iptables
systemctl enable iptables --now
systemctl restart network
ip -br a
</code></pre></p>
<p>Устанавливаем NetworkManager</p>
<p><pre><code>apt-get update
apt-get install -y NetworkManager-tui
systemctl enable --now NetworkManager
</code></pre></p>
<br>
<p>Запуск BR-RTR</p>
<p><code>hostnamectl hostname BR-RTR.au-team.irpo ; exec bash</code></p>
<p>Настраиваем статичный IP и iptables</p>
<p><pre><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/options
echo '${e.brRtr.interfaces.isp.ip}/${e.brRtr.interfaces.isp.mask}' > /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/ipv4address
echo 'default via ${e.isp.interfaces.brRtr.ip}' > /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/ipv4route
echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/resolv.conf
sed -i 's/^net\\.ipv4\\.ip_forward *= *.*/net.ipv4.ip_forward = 1/' /etc/net/sysctl.conf
iptables -t nat -j MASQUERADE -A POSTROUTING
iptables-save > /etc/sysconfig/iptables
systemctl enable iptables --now
systemctl restart network
ip -br a
</code></pre></p>
<p>Устанавливаем NetworkManager</p>
<p><pre><code>apt-get update
apt-get install -y NetworkManager-tui
systemctl enable --now NetworkManager
</code></pre></p>
<p>запускаем <code>nmtui</code></p>
<p>редактируем 1 соединение ens19</p>
<p>имя профиля <code>BR-SRV</code></p>
<p>ip <code>${e.brRtr.interfaces.brSrv.ip}/${e.brRtr.interfaces.brSrv.mask}</code></p>
<p>перезагружаем соединение BR-SRV</p>
<br>
<p>Запуск BR-SRV</p>
<p><code>hostnamectl hostname BR-SRV.au-team.irpo ; exec bash</code></p>
<p>Настраиваем статичный IP</p>
<p><pre><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.brSrv.interfaces.brRtr.name}/options
echo '${e.brSrv.interfaces.brRtr.ip}/${e.brSrv.interfaces.brRtr.mask}' > /etc/net/ifaces/${e.brSrv.interfaces.brRtr.name}/ipv4address
echo 'default via ${e.brRtr.interfaces.brSrv.ip}' > /etc/net/ifaces/${e.brSrv.interfaces.brRtr.name}/ipv4route
echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.brSrv.interfaces.brRtr.name}/resolv.conf
systemctl restart network
ip -br a
</code></pre></p>
<br>
<p>Запуск HQ-SRV</p>
<p><code>hostnamectl hostname HQ-SRV.au-team.irpo ; exec bash</code></p>
<p>Настраиваем статичный IP</p>
<p><pre><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.hqSrv.interfaces.hqRtr.name}/options
echo '${e.hqSrv.interfaces.hqRtr.ip}/${e.hqSrv.interfaces.hqRtr.mask}' > /etc/net/ifaces/${e.hqSrv.interfaces.hqRtr.name}/ipv4address
echo 'default via ${e.hqSrv.interfaces.hqRtr.gateway}' > /etc/net/ifaces/${e.hqSrv.interfaces.hqRtr.name}/ipv4route
echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.hqSrv.interfaces.hqRtr.name}/resolv.conf
systemctl restart network
ip -br a
</code></pre></p>
<br>
<h3>Задание 3</h3>
<p>HQ-SRV и BR-SRV</p>
<p><code>adduser sshuser</code></p>
<p><code>passwd sshuser</code></p>
<p>указываем <code>P@ssw0rd</code></p>
<p><code>usermod -u 1010 sshuser</code></p>
<p><code>visudo</code></p>
<p>раскомментировать строки:</p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) ALL</code></p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL</code></p>
<p><code>vim /etc/group</code></p>
<p>дополнить строку wheel пользователем sshuser</p>
<br>
<p>HQ-RTR и BR-RTR</p>
<p><code>adduser net_admin</code></p>
<p><code>passwd net_admin</code></p>
<p>указываем <code>P@$$word</code></p>
<p><code>visudo</code></p>
<p>раскомментировать строки:</p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) ALL</code></p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL</code></p>
<p><code>vim /etc/group</code></p>
<p>дополнить строку wheel пользователем net_admin</p>
<br>
<h3>Задание 4</h3>
<p>Запуск HQ-RTR</p>
<pre><code>apt-get install -y openvswitch
systemctl enable --now openvswitch
ovs-vsctl add-br HQ-SW
ovs-vsctl add-port HQ-SW ens19
ovs-vsctl add-port HQ-SW vlan100 tag=100 -- set interface vlan100 type=internal
ovs-vsctl add-port HQ-SW vlan200 tag=200 -- set interface vlan200 type=internal
ovs-vsctl add-port HQ-SW vlan999 tag=999 -- set interface vlan999 type=internal
mkdir /etc/net/ifaces/vlan100
mkdir /etc/net/ifaces/vlan200
mkdir /etc/net/ifaces/vlan999
cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan100/options
cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan200/options
cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan999/options
echo '${e.hqRtr.interfaces.hqSrv.ip}/${e.hqRtr.interfaces.hqSrv.mask}' >> /etc/net/ifaces/vlan100/ipv4address
echo '${e.hqRtr.interfaces.hqCli.ip}/${e.hqRtr.interfaces.hqCli.mask}' >> /etc/net/ifaces/vlan200/ipv4address
echo '${e.hqRtr.interfaces.vlan999.ip}/${e.hqRtr.interfaces.vlan999.mask}' >> /etc/net/ifaces/vlan999/ipv4address
systemctl restart network
ip -br a
</code></pre>
<br>
<p>Настройка статичного ip на HQ-CLI</p>
<details>
  <summary>Можно не настраивать если у нас есть dhcp</summary>
  <p>Пароль <code>resu</code></p>
  <p>Открыть терминал</p>
  <p><code>su -</code></p>
  <p>пароль <code>toor</code></p>
  <p>Указываем статичный ipv4 адрес для ${e.brSrv.interfaces.brRtr.name}</p>
  <p><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.hqCli.interfaces.hqRtr.name}/options</code></p>
  <p>Настраиваем IP-адрес</p>
  <p><code>echo '${e.hqCli.interfaces.hqRtr.ip}/${e.hqCli.interfaces.hqRtr.mask}' > /etc/net/ifaces/${e.hqCli.interfaces.hqRtr.name}/ipv4address</code></p>
  <p>Настраиваем шлюз</p>
  <p><code>echo 'default via ${e.hqCli.interfaces.hqRtr.ip}' > /etc/net/ifaces/${e.hqCli.interfaces.hqRtr.name}/ipv4route</code></p>
  <p>Указываем DNS</p>
  <p><code>echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.hqCli.interfaces.hqRtr.name}/resolv.conf</code></p>
  <p><code>systemctl restart network</code></p>
  <p><code>ip -br a</code></p>
  <p><code>ping ${e.hqCli.interfaces.hqRtr.ip}</code></p>
</details>
<br>
<h3>Задание 5</h3>
<p>HQ-SRV и BR-SRV</p>
<p><code>vim /etc/openssh/sshd_config</code></p>
<p>правим строку на <code>Port 2024</code></p>
<p>добавляем строки</p>
<p><code>AllowUsers sshuser</code></p>
<p><code>MaxAuthTries 2</code></p>
<p><code>Banner /etc/ban</code></p>
<p><code>echo 'Authorized access only' > /etc/ban</code></p>
<p><code>systemctl restart sshd</code></p>
<br>
<h3>Задание 6</h3>
<p>HQ-RTR</code></p>
<p><code>nmtui</code></p>
<p>добавляем интерфейс <code>ip tunnel</code></p>
<p>Имя профиля: <code>BR-RTR</code></p>
<p>Device: <code>gre1</code></p>
<p>Mode: <code>GRE</code></p>
<p>Parent: <code>ens18</code></p>
<p>Local ip: <code>${e.hqRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${e.brRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${e.hqRtr.interfaces.brRtr.ip}/${e.hqRtr.interfaces.brRtr.mask}</code></p>
<p>перезагружаем соединение BR-RTR</p>
<p>проверяем: <code>ip -br a</code></p>
<br>
<p>BR-RTR</p>
<p><code>nmtui</code></p>
<p>добавляем интерфейс <code>ip tunnel</code></p>
<p>Имя профиля: <code>HQ-RTR</code></p>
<p>Device: <code>gre1</code></p>
<p>Mode: <code>GRE</code></p>
<p>Parent: <code>ens18</code></p>
<p>Local ip: <code>${e.brRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${e.hqRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${e.brRtr.interfaces.hqRtr.ip}/${e.brRtr.interfaces.hqRtr.mask}</code></p>
<p>перезагружаем соединение HQ-RTR</p>
<p>проверяем: <code>ip -br a</code></p>
<br>
<h3>Задание 7</h3>
<p>HQ-RTR</p>
<p><code>apt-get install -y frr</code></p>
<p><code>vim /etc/frr/daemons</code></p>
<p>исправить строку <code>ospfd=yes</code></p>
<p><code>systemctl restart frr</code></p>
<p><code>systemctl enable --now frr</code></p>
<pre><code>vtysh
conf t
ip forwarding
router ospf
network ${e.hqRtr.interfaces.brRtr.netAddress}/${e.hqRtr.interfaces.brRtr.mask} area 0
network ${e.hqRtr.interfaces.hqSrv.netAddress}/${e.hqRtr.interfaces.hqSrv.mask} area 0
network ${e.hqRtr.interfaces.hqCli.netAddress}/${e.hqRtr.interfaces.hqCli.mask} area 0
network ${e.hqRtr.interfaces.vlan999.netAddress}/${e.hqRtr.interfaces.vlan999.mask} area 0
ex
int gre1
no ip ospf passive
ex
ex
wr
ex
</code></pre>
<p><code>vim /etc/NetworkManager/system-connections/BR-RTR.nmconnection</code></p>
<p>Добавить в секцию ip-tunnel <code>ttl=64</code></p>
<p><code>reboot</code></p>
<br>
<p>BR-RTR</p>
<p><code>apt-get install -y frr</code></p>
<p><code>vim /etc/frr/daemons</code></p>
<p>исправить строку <code>ospfd=yes</code></p>
<p><code>systemctl restart frr</code></p>
<p><code>systemctl enable --now frr</code></p>
<pre><code>
vtysh
conf t
ip forwarding
router ospf
passive-interface default
network ${e.brRtr.interfaces.hqRtr.netAddress}/${e.brRtr.interfaces.hqRtr.mask} area 0
network ${e.brRtr.interfaces.brSrv.netAddress}/${e.brRtr.interfaces.brSrv.mask} area 0
ex
int gre1
no ip ospf passive
ex
ex
wr
ex
</code></pre>
<p><code>vim /etc/NetworkManager/system-connections/HQ-RTR.nmconnection</code></p>
<p>Добавить в секцию ip-tunnel <code>ttl=64</code></p>
<p><code>reboot</code></p>
<br>
<h3>Задание 8</h3>
<p>HQ-RTR</p>
<pre><code>iptables -t nat -j MASQUERADE -A POSTROUTING
iptables-save > /etc/sysconfig/iptables
systemctl enable --now iptables
</code></pre>
<p>BR-RTR</p>
<pre><code>
iptables -t nat -j MASQUERADE -A POSTROUTING
iptables-save > /etc/sysconfig/iptables
systemctl enable --now iptables
</code></pre>
<br>
<h3>Задание 9</h3>
<p>HQ-RTR</p>
<p><code>apt-get install -y dhcp-server</code></p>
<p><code>vim /etc/sysconfig/dhcpd</code></p>
<p><code>DHCPDARCS=vlan200</code></p>
<p><code>cp /etc/dhcp/dhcpd.conf.example /etc/dhcp/dhcpd.conf</code></p>
<br>
<p><code>vim /etc/dhcp/dhcpd.conf</code></p>
<p>стереть строки (dd):</p>
<p><code>option domain-name "example.org";</code></p>
<p><code>option domain-name-servers ns1.example.org, ns2.example.org;</code></p>
<br>
<p>В виме ввести <code>:set paste</code> для включения режима вставки</p>
<p><pre><code>option domain-name "au-team.irpo";
option domain-name-servers ${e.hqSrv.interfaces.hqRtr.ip};

ddns-update-style interim;
update-static-leases on;

zone au-team.irpo {
&#9;primary ${e.hqSrv.interfaces.hqRtr.ip};
}

zone ${S(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa {
&#9;primary ${e.hqSrv.interfaces.hqRtr.ip};
}

zone ${S(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa {
&#9;primary ${e.hqSrv.interfaces.hqRtr.ip};
}

subnet ${e.hqRtr.interfaces.hqCli.netAddress} netmask ${ge(e.hqRtr.interfaces.hqCli.mask)} {
&#9;range ${e.hqCli.interfaces.hqRtr.ip} ${ye(e.hqCli.interfaces.hqRtr.ip)};
&#9;option routers ${e.hqRtr.interfaces.hqCli.ip};
}</code></pre></p>
<p>Если нужно, выключить режим вставки <code>:set nopaste</code> </p>
<br>
<p><code>systemctl restart dhcpd</code></p>
<p><code>systemctl enable dhcpd</code></p>
<br>
<p>HQ-CLI</p>
<p>проверка работы dhcp</p>
<p><code>hostnamectl hostname HQ-CLI.au-team.irpo ; exec bash</code></p>
<p><code>ip -br a</code></p>
<br>
<h3>Задание 10</h3>
<p>HQ-SRV</p>
<p><code>apt-get update</code></p>
<p><code>apt-get install -y bind</code></p>
<p><code>cd /var/lib/bind/etc/</code></p>
<p><code>vim options.conf</code></p>
<p>скорректировать:</p>
<p><code>listen-on { any; };</code></p>
<p><code>listen-on-v6 { none; };</code></p>
<p><code>forwarders { 8.8.8.8; };</code></p>
<p><code>allow-query { any; };</code></p>
<p><code>allow-recursion { any; };</code></p>
<br>
<p><code>vim rfc1912.conf</code></p>
<p>В виме ввести <code>:set paste</code> для включения режима вставки</p>
<p>Удалить лишнее и оставить:</p>
<p><pre><code>
zone "au-team.irpo" {
&#9;type master;
&#9;file "au-team.db";
&#9;allow-update { any; };
};

zone "${S(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa" {
&#9;type master;
&#9;file "100.db";
&#9;allow-update { any; };
};

zone "${S(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa" {
&#9;type master;
&#9;file "200.db";
&#9;allow-update { any; };
};
</code></pre></p>
<p><code>cp zone/localdomain zone/au-team.db</code></p>
<p><code>cp zone/127.in-addr.arpa zone/100.db</code></p>
<br>
<p><code>vim zone/100.db</code></p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p><pre><code>@&#9;IN&#9;SOA&#9;${S(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa. root.${S(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa. (</code></pre></p>
<br>
<pre><code>&#9;&#9;&#9;)</code></pre>
<pre><code>&#9;IN&#9;NS&#9;${S(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa.
&#9;IN&#9;A&#9;${e.hqSrv.interfaces.hqRtr.ip}
${L(e.hqSrv.interfaces.hqRtr.ip)}&#9;IN&#9;PTR&#9;hq-srv.au-team.irpo.
${L(e.hqRtr.interfaces.hqSrv.ip)}&#9;IN&#9;PTR&#9;hq-rtr.au-team.irpo.
</code></pre>
<br>
<p><code>cp zone/100.db zone/200.db</code></p>
<p><code>vim zone/200.db</code></p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p><pre><code>@&#9;IN&#9;SOA&#9;${S(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa. root.${S(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa. (</code></pre></p>
<br>
<p><pre><code>&#9;&#9;&#9;)</code></pre></p>
<p><pre><code>&#9;IN&#9;NS&#9;${S(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa.
&#9;IN&#9;A&#9;${e.hqSrv.interfaces.hqRtr.ip}
${L(e.hqCli.interfaces.hqRtr.ip)}&#9;IN&#9;PTR&#9;hq-cli.au-team.irpo.
${L(e.hqRtr.interfaces.hqCli.ip)}&#9;IN&#9;PTR&#9;hq-rtr.au-team.irpo.
</code></pre></p>
<br>
<p><code>vim zone/au-team.db</code></p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p><pre><code>@&#9;IN&#9;SOA&#9;hq-srv.au-team.irpo. root.au-team.irpo. (</code></pre></p>
<br>
<p><pre><code>&#9;&#9;&#9;)</code></pre></p>
<p><pre><code>
&#9;IN&#9;NS&#9;hq-srv.au-team.irpo.
&#9;IN&#9;A&#9;${e.hqSrv.interfaces.hqRtr.ip}
hq-rtr&#9;IN&#9;A&#9;${e.hqRtr.interfaces.hqSrv.ip}
br-rtr&#9;IN&#9;A&#9;${e.brRtr.interfaces.brSrv.ip}
hq-srv&#9;IN&#9;A&#9;${e.hqSrv.interfaces.hqRtr.ip}
hq-cli&#9;IN&#9;A&#9;${e.hqCli.interfaces.hqRtr.ip}
br-srv&#9;IN&#9;A&#9;${e.brSrv.interfaces.brRtr.ip}
wiki&#9;IN&#9;CNAME&#9;hq-rtr.au-team.irpo.
moodle&#9;IN&#9;CNAME&#9;hq-rtr.au-team.irpo.
</code></pre></p>
<br>
<p><code>rndc-confgen > rndc.key</code></p>
<p><code>sed -i '6,$d' rndc.key</code></p>
<p><code>chgrp -R named zone/</code></p>
<p><code>named-checkconf</code></p>
<p><code>named-checkconf -z</code></p>
<p><code>echo -e 'nameserver ${e.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf</code></p>
<p><code>systemctl restart network</code></p>
<p><code>systemctl enable --now bind</code></p>
<br>
<p>BR-RTR</p>
<p><pre><code>echo -e 'nameserver ${e.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf
systemctl restart network
</code></pre></p>
<br>
<p>BR-SRV</p>
<p><pre><code>echo -e 'nameserver ${e.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf
systemctl restart network
</code></pre></p>
<br>
<p>HQ-RTR</p>
<p><pre><code>echo -e 'nameserver ${e.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf
systemctl restart network
</code></pre></p>
<br>
<p>HQ-CLI</p>
<p><pre><code>echo -e 'nameserver ${e.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf
systemctl restart network
</code></pre></p>
<br>
<h3>Задание 11</h3>
<p>HQ-SRV, BR-SRV, HQ-RTR, BR-RTR, HQ-CLI</p>
<p><code>timedatectl set-timezone Europe/Moscow</code></p>
<br>
<h2>Модуль № 2</h2>
<h3>Задание 1</h3>
<p>BR-SRV</p>
<p><pre><code>apt-get update
apt-get install -y task-samba-dc
rm -f /etc/samba/smb.conf
rm -rf /var/lib/samba/
rm -rf /var/cache/samba/
mkdir -p /var/lib/samba/sysvol
samba-tool domain provision
</code></pre></p>
<p><code>P@ssw0rd</code></p>
<p><pre><code>
systemctl enable --now samba.service
\\cp -f /var/lib/samba/private/krb5.conf /etc/
</code></pre></p>
<p><code>visudo</code></p>
<p>добавляем ниже <code># root ALL=(ALL:ALL) ALL</code></p>
<p><code>%hq ALL=(ALL) NOPASSWD: /bin/cat, /bin/grep, /usr/bin/id</code></p>
<p><code>vim /opt/users.csv</code></p>
<p>добавляем (проследить, чтобы не было пустых строк)</p>
<p><pre><code>user1.hq;P@ssw0rd
user2.hq;P@ssw0rd
user3.hq;P@ssw0rd
user4.hq;P@ssw0rd
user5.hq;P@ssw0rd</code></pre></p>
<p><code>mkdir -p /opt/smdscripts</code></p>
<p><code>vim /opt/smdscripts/import.sh</code></p>
<p><pre><code>#!/bin/bash
while IFS=';' read -r username password; do
&#9;samba-tool user create "$username" "$password"
&#9;samba-tool group addmembers hq "$username"
done < /opt/five_users.csv
</code></pre></p>
<p>сохраняем</p>
<p><code>chmod +x /opt/smdscripts/import.sh</code></p>
<p><code>samba-tool group create hq</code></p>
<p><code>/opt/smdscripts/import.sh</code></p>
<p><code>samba-tool dns add br-srv.au-team.irpo au-team.irpo hq-rtr A ${e.hqRtr.interfaces.hqSrv.ip} -U Administrator</code></p>
<p>пароль <code>P@ssw0rd</code></p>
<p><code>samba-tool dns add br-srv.au-team.irpo au-team.irpo wiki CNAME hq-rtr.au-team.irpo -U Administrator</code></p>
<p>пароль <code>P@ssw0rd</code></p>
<p><code>samba-tool dns add br-srv.au-team.irpo au-team.irpo moodle CNAME hq-rtr.au-team.irpo -U Administrator</code></p>
<p>пароль <code>P@ssw0rd</code></p>
<br>
<p>HQ-RTR</p>
<p>Надо предварительно настроить chrony???</p>
<p><code>systemctl restart dhcpd</code></p>
<br>
<p>HQ-CLI</p>
<p><pre><code>echo -e 'search au-team.irpo\\nnameserver ${e.brSrv.interfaces.brRtr.ip}' > /etc/resolv.conf
systemctl restart network
</code></pre></p>
<p>Запускаем Control Center > пишем в поиске <code>acc</code> > <code>toor</code></p>
<p>Users > Authentication</p>
<p>Активируем Active Directory domain</p>
<p>Workgroup: au-team</p>
<p>Применить</p>
<p>Пароль <code>P@ssw0rd</code></p>
<p>ок</p>
<p>reboot</p>
<p>проверяем через терминал</p>
<p><code>wbinfo --ping-dc</code></p>
<br>
<h3>Задание 2</h3>
<p>HQ-SRV</p>
<p><code>mdadm --create --verbose /dev/md0 --level=5 --raid-devices=3 /dev/sdc /dev/sdb /dev/sdd</code></p>
<p><code>mdadm --detail --scan I tee -a /etc/mdadm.conf</code></p>
<p><code>mkfs.ext4 /dev/md0</code></p>
<p><code>mkdir -p /raid5</code></p>
<p><code>bikid /dev/md0 > /etc/fstab</code></p>
<p><code>vim /etc/fstab</code></p>
<p>в последней строке оставляем только UUID и приписываем /raid5 ext4 defaults 0 0 </p>
<p>сохраняем</p>
<p>проверяем что пространство монтируется</p>
<p><code>mount -a</code></p>
<p>ошибок не должно быть</p>
<p><code>apt-get install -y nfs-server</code></p>
<p><code>mkdir -p /raid5/nfs</code></p>
<p><code>vim /etc/exports</code></p>
<p>добавляем второй строкой /raid5/nfs ${e.hqSrv.interfaces.hqRtr.ip}(rw,sync,no_subtree_check)</p>
<p>сохраняем</p>
<p><code>exportfs -a</code></p>
<p><code>systemctl restart nfs-server.service</code></p>
<p><code>systemctl enable --now nfs-server.service</code></p>
<br>
<p>HQ-CLI</p>
<p>пользователь <code>user</code></p>
<p>пароль <code>resu</code></p>
<p>открываем терминал</p>
<p><code>su -</code></p>
<p>пароль <code>toor</code></p>
<p><code>mkdir -p /mnt/nfs</code></p>
<p><code>vim /etc/fstab</code></p>
<p>дописываем</p>
<p>${e.hqSrv.interfaces.hqRtr.ip}:/raid5/nfs /mnt/nfs nfs defaults 0 0</p>
<p>сохраняем</p>
<p>проверяем что пространство монтируется <code>mount -a</code></p>
<p>ошибок не должно быть</p>
<br>
<h3>Задание 3</h3>
<p>HQ-RTR</p>
<p><code>apt-get install -y chrony</code></p>
<p><code>vim /etc/chrony.conf</code></p>
<p>В виме ввести <code>:set paste</code> для включения режима вставки</p>
<p><pre><code>
# Serve time even if not synchronized to a time source.
server ${e.hqRtr.interfaces.hqSrv.ip} iburst
local stratum 5

allow ${e.hqRtr.interfaces.hqSrv.netAddress}/${e.hqRtr.interfaces.hqSrv.mask}
allow ${e.hqRtr.interfaces.hqCli.netAddress}/${e.hqRtr.interfaces.hqCli.mask}
allow ${e.brRtr.interfaces.brSrv.netAddress}/${e.brRtr.interfaces.brSrv.mask}
</code></pre></p>
<p><code>systemctl restart chronyd</code></p>
<br>
<p>HQ-SRV, HQ-CLI, BR-RTR, BR-SRV</p>
<p><code>apt-get install -y chrony</code></p>
<p><code>echo "server 192.168.1.1 iburst" >> /etc/chrony.conf</code></p>
<p><code>systemctl restart chronyd</code></p>
<p>Проверка:</p>
<p><code>chronyc tracking</code></p>
<h3>Задание 4</h3>
<p>BR-SRV</p>
<p><code>apt-get install -y ansible</code></p>
<p>одной командой:</p>
<p><code>echo -e "[all]\\nhq-srv ansible_host=${e.hqSrv.interfaces.hqRtr.ip} ansible_connection=local\\nhq-cli ansible_host=${e.hqCli.interfaces.hqRtr.ip} ansible_connection=local\\nhq-rtr ansible_host=${e.hqRtr.interfaces.hqSrv.ip} ansible_connection=local\\nbr-rtr ansible_host=${e.brRtr.interfaces.brSrv.ip} ansible_connection=local" | sudo tee /etc/ansible/hosts > /dev/null</code></p>
<p>или</p>
<p><code>vim /etc/ansible/hosts</code></p>
<p><code>[all]</code></p>
<p><code>hq-srv ansible_host=${e.hqSrv.interfaces.hqRtr.ip} ansible_connection=local</code></p>
<p><code>hq-cli ansible_host=${e.hqCli.interfaces.hqRtr.ip} ansible_connection=local</code></p>
<p><code>hq-rtr ansible_host=${e.hqRtr.interfaces.hqSrv.ip} ansible_connection=local</code></p>
<p><code>br-rtr ansible_host=${e.brRtr.interfaces.brSrv.ip} ansible_connection=local</code></p>
<p>проверка</p>
<p><code>ansible all -m ping</code></p>
<br>
<h3>Задание 5</h3>
<p>BR-SRV</p>
<p><code>apt-get install -y docker-io docker-compose</code></p>
<p><code>systemctl enable --now docker</code></p>
<p><code>vim wiki.yml</code></p>
<p><code>:set paste</code></p>
<p><pre><code>services:
  wiki:
    image: mediawiki
    container_name: mediawiki
    restart: always
    ports:
      - 8080:80
    links:
      - mariadb
    volumes:
      - images:/var/www/html/images
#      - ~/LocalSettings.php:/var/www/html/LocalSettings.php
  mariadb:
    image: mariadb
    container_name: mariadb
    hostname: mariadb
    restart: always
    environment:
      MYSQL_DATABASE: mediawiki
      MYSQL_USER: wiki
      MYSQL_PASSWORD: WikiP@ssw0rd
      MYSQL_RANDOM_ROOT_PASSWORD: 1
    volumes:
      - db:/var/lib/mysql

volumes:
  images:
  db:
</code></pre></p>
<p><code>docker compose -f wiki.yml up -d</code></p>
<p>HQ-CLI</p>
<p>Переходим в Яндекс браузере на br-srv (или айпи, надо проверять)</p>
<p>Нажимаем complete, выбираем русский язык, потом настраиваем mariadb: справка <code>mariadb</code>, имя БД <code>mediawiki</code>, имя пользователя БД <code>wiki</code> и пароль <code>WikiP@ssw0rd</code></p>
<p>Ставим галочку. справка: <code>wiki</code>; то же, что и имя вики; Admin и пароль <code>WikiP@ssw0rd</code>)</p>
<p>Выбираем "Хватит уже, просто установите вики"</p>
<p><code>scp -P 2024 /home/user/Downloads/LocalSettings.php sshuser@${e.brSrv.interfaces.brRtr.ip}:/root/</code></p>
<p>BR-SRV</p>
<p>Раскомментировать строчку в wiki.yml</p>
<br>
<h3>Задание 6</h3>
<p>HQ-RTR</p>
<p><code>iptables -t nat -A PREROUTING -p tcp --dport 22 -j DNAT --to-destination ${e.hqSrv.interfaces.hqRtr.ip}:2024</code></p>
<p><code>iptables-save >> /etc/sysconfig/iptables</code></p>
<p>BR-RTR</p>
<p><code>iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination ${e.brSrv.interfaces.brRtr.ip}:8080</code></p>
<p><code>iptables -t nat -A PREROUTING -p tcp --dport 22 -j DNAT --to-destination ${e.brSrv.interfaces.brRtr.ip}:2024</code></p>
<p><code>iptables-save >> /etc/sysconfig/iptables</code></p>
<br>
<h3>Задание 8</h3>
<p>HQ-RTR</p>
<p><code>apt-get install -y nginx</code></p>
<p><code>vim /etc/nginx/sites-available.d/proxy.conf</code></p>
<p><pre><code>
server {
  listen 80;
  server_name moodle.au-team.irpo;

  location / {
    proxy_pass http://${e.hqSrv.interfaces.hqRtr.ip};
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

server {
  listen 80;
  server_name wiki.au-team.irpo;

  location / {
    proxy_pass http://${e.brSrv.interfaces.brRtr.ip};
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
</p></pre></code>
<br>
<p><code>ln -s /etc/nginx/sites-available.d/proxy.conf /etc/nginx/sites-enabled.d/</code></p>
<p>Проверка: <code>nginx -t</code></p>
<p><code>systemctl restart nginx</code></p>
<p><code>systemctl enable --now nginx</code></p>
<br>
<h3>Задание 9</h3>
<p>HQ-CLI</p>
<p><code>su -</code></p>
<p><code>apt-get update</code></p>
<p><code>apt-get install -y yandex-browser-stable</code></p>
<br>
`,ke=(e,{devices:t})=>{const r=document.createElement("table"),n=document.createElement("thead");n.innerHTML=`
    <tr>
      <th>Имя устройства</th>
      <th>Назначение (куда смотрит)</th>
      <th>IP-адрес</th>
      <th>Маска</th>
      <th>Шлюз по умолчанию</th>
    </tr>
  `,r.appendChild(n);const s=document.createElement("tbody");Object.values(t).forEach(({name:a,interfaces:i})=>{const h=Object.values(i);if(!h.length)return;const p=document.createElement("tr");p.innerHTML=`
      <td rowspan="${h.length}">${a}</td>
      <td>${h[0].destination||"-"}</td>
      <td>${h[0].ip}</td>
      <td>${h[0].mask}</td>
      <td>${h[0].gateway}</td>
    `,s.appendChild(p);for(let q=1;q<h.length;q+=1){const m=h[q],g=document.createElement("tr");g.innerHTML=`
        <td>${m.destination||"-"}</td>
        <td>${m.ip}</td>
        <td>${m.mask}</td>
        <td>${m.gateway}</td>
      `,s.appendChild(g)}}),r.appendChild(s),e.ipTableContainer.innerHTML="",e.ipTableContainer.appendChild(r)},Ae=(e,t)=>{const r=_e(t);e.textContainer.innerHTML=r,document.querySelectorAll("code").forEach(n=>{const s=document.createElement("span");s.className="code-wrapper";const a=document.createElement("div");a.className="code-copy-toast",a.textContent="Скопировано!",n.parentNode.insertBefore(s,n),s.appendChild(n),s.appendChild(a),n.style.cursor="pointer",n.title="Кликни, чтобы скопировать",n.addEventListener("click",()=>{navigator.clipboard.writeText(n.innerText).then(()=>{a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),300)})})})},$e=(e,t)=>(r,n)=>{switch(r){case"devices":ke(e,t),Ae(e,t);break}};function ve(e){const t=new Set;return Object.values(e).forEach(r=>{Object.values(r.interfaces).forEach(({netAddress:n,netName:s,mask:a})=>{s!=="external"&&t.add(JSON.stringify({netAddress:n,netName:s,mask:a}))})}),Array.from(t).map(r=>JSON.parse(r))}function Ce(e,t){const r=document.createElement("form");r.id="network-form",r.innerHTML="<h3>Настройки сетей</h3>",e.forEach(s=>{const a=document.createElement("div");a.className="network-input";const i=document.createElement("label");i.textContent=`Сеть ${s.netName}:`;const h=document.createElement("input");h.type="text",h.placeholder=`Адрес сети (${s.netAddress})`,h.dataset.netAddress=s.netAddress;const p=document.createElement("input");p.type="text",p.placeholder=`Маска (${s.mask})`,p.dataset.netAddress=s.netAddress,a.append(i,h,p),r.append(a)});const n=document.createElement("button");n.type="button",n.textContent="Обновить",r.append(n),t.innerHTML="",t.append(r)}function Te(){const e=document.querySelectorAll("#network-form input"),t={};return e.forEach(r=>{const{netAddress:n}=r.dataset;t[n]||(t[n]={}),r.placeholder.includes("Адрес сети")?t[n].address=r.value.trim():t[n].mask=r.value.trim()}),t}function O(e){return e.split(".").reduce((t,r)=>(t<<8)+parseInt(r,10),0)>>>0}function X(e){return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}function J(e,t){const r=t?4294967295<<32-t:0;return e&~r}function He(e,t){const r=JSON.parse(JSON.stringify(e));return Object.entries(t).forEach(([n,s])=>{if(!s.address||!s.mask)return;const a=O(s.address),i=parseInt(s.mask,10);Object.values(r).forEach(h=>{Object.values(h.interfaces).forEach(p=>{if(p.netAddress===n){const q=O(p.ip),m=parseInt(p.mask,10),g=J(q,m),$=a&4294967295<<32-i|g;if(p.ip=X($),p.mask=s.mask.toString(),p.netAddress=s.address,p.gateway!=="-"){const v=O(p.gateway),C=J(v,m),T=a&4294967295<<32-i|C;p.gateway=X(T)}}})})}),r}const D={isp:{name:"ISP",interfaces:{external:{name:"ens18",ip:"<ВНЕШНИЙ>",mask:"24",gateway:"<ВНЕШНИЙ>",destination:"Интернет",netAddress:"",netName:"external"},hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28",gateway:"-",destination:"HQ-RTR",netAddress:"172.16.4.0",netName:"ISP-HQ"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28",gateway:"-",destination:"BR-RTR",netAddress:"172.16.5.0",netName:"ISP-BR"}}},hqRtr:{name:"HQ-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28",gateway:"172.16.4.1",destination:"ISP",netAddress:"172.16.4.0",netName:"ISP-HQ"},brRtr:{name:"gre1",ip:"10.5.5.1",mask:"30",gateway:"-",destination:"BR-RTR",netAddress:"10.5.5.0",netName:"GRE"},hqSrv:{name:"VLAN100",ip:"192.168.100.1",mask:"26",gateway:"-",destination:"HQ-SRV",netAddress:"192.168.100.0",netName:"SRV-Net"},hqCli:{name:"VLAN200",ip:"192.168.200.1",mask:"28",gateway:"-",destination:"HQ-CLI",netAddress:"192.168.200.0",netName:"CLI-Net"},vlan999:{name:"VLAN999",ip:"192.168.99.1",mask:"29",gateway:"-",destination:"VLAN999 (?)",netAddress:"192.168.99.0",netName:"vlan999"}}},hqSrv:{name:"HQ-SRV",interfaces:{hqRtr:{name:"ens18",ip:"192.168.100.2",mask:"26",gateway:"192.168.100.1",destination:"HQ-RTR",netAddress:"192.168.100.0",netName:"SRV-Net"}}},hqCli:{name:"HQ-CLI",interfaces:{hqRtr:{name:"ens18",ip:"192.168.200.2",mask:"28",gateway:"192.168.200.1",destination:"HQ-RTR",netAddress:"192.168.200.0",netName:"CLI-Net"}}},brRtr:{name:"BR-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28",gateway:"172.16.5.1",destination:"ISP",netAddress:"172.16.5.0",netName:"ISP-BR"},brSrv:{name:"ens19",ip:"192.168.0.1",mask:"27",gateway:"-",destination:"BR-SRV",netAddress:"192.168.0.0",netName:"BR-Net"},hqRtr:{name:"gre1",ip:"10.5.5.2",mask:"30",gateway:"-",destination:"HQ-RTR",netAddress:"10.5.5.0",netName:"GRE"}}},brSrv:{name:"BR-SRV",interfaces:{brRtr:{name:"ens18",ip:"192.168.0.2",mask:"27",gateway:"192.168.0.1",destination:"BR-RTR",netAddress:"192.168.0.0",netName:"BR-Net"}}}},Ie=()=>{const e={ipTableContainer:document.getElementById("ip-table-container"),textContainer:document.getElementById("text-container"),networkFormContainer:document.getElementById("network-form-container")},t={devices:[]},r=U(t,$e(e,t));r.devices=D;const n=ve(D);Ce(n,e.networkFormContainer),document.querySelector("#network-form button").addEventListener("click",()=>{const s=Te();console.log(s);const a=He(D,s);console.log(a),r.devices=a})};Ie();
