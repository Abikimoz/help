/* eslint-disable no-tabs */

const getReverseZone = (addr) => addr
  .split('.')
  .slice(0, 3)
  .reverse()
  .join('.');

const cidrToMask = (cidr) => {
  const mask = Array(4).fill(0).map((_, i) => {
    const bits = Math.min(8, Math.max(0, cidr - i * 8));
    return 256 - 2 ** (8 - bits);
  });

  return mask.join('.');
};

const getRangeFor3 = (ip) => {
  const parts = ip.split('.').map(Number);
  const lastOctet = parts[3] + 3;

  parts[3] = lastOctet;
  return parts.join('.');
};

const getLastOctet = (ipAddress) => ipAddress.split('.')[3];

export default ({ devices }) => `
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
<p>${devices.isp.interfaces.hqRtr.name}: <code>${devices.isp.interfaces.hqRtr.ip}/${devices.isp.interfaces.hqRtr.mask}</code></p>
<p>Имя профиля: <code>BR-RTR</code></p>
<p>${devices.isp.interfaces.brRtr.name}: <code>${devices.isp.interfaces.brRtr.ip}/${devices.isp.interfaces.brRtr.mask}</code></p>
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
<p><pre><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${devices.hqRtr.interfaces.isp.name}/options
echo '${devices.hqRtr.interfaces.isp.ip}/${devices.hqRtr.interfaces.isp.mask}' > /etc/net/ifaces/${devices.hqRtr.interfaces.isp.name}/ipv4address
echo 'default via ${devices.isp.interfaces.hqRtr.ip}' > /etc/net/ifaces/${devices.hqRtr.interfaces.isp.name}/ipv4route
echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${devices.hqRtr.interfaces.isp.name}/resolv.conf
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
<p><pre><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${devices.brRtr.interfaces.isp.name}/options
echo '${devices.brRtr.interfaces.isp.ip}/${devices.brRtr.interfaces.isp.mask}' > /etc/net/ifaces/${devices.brRtr.interfaces.isp.name}/ipv4address
echo 'default via ${devices.isp.interfaces.brRtr.ip}' > /etc/net/ifaces/${devices.brRtr.interfaces.isp.name}/ipv4route
echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${devices.brRtr.interfaces.isp.name}/resolv.conf
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
<p>ip <code>${devices.brRtr.interfaces.brSrv.ip}/${devices.brRtr.interfaces.brSrv.mask}</code></p>
<p>перезагружаем соединение BR-SRV</p>
<br>
<p>Запуск BR-SRV</p>
<p><code>hostnamectl hostname BR-SRV.au-team.irpo ; exec bash</code></p>
<p>Настраиваем статичный IP</p>
<p><pre><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${devices.brSrv.interfaces.brRtr.name}/options
echo '${devices.brSrv.interfaces.brRtr.ip}/${devices.brSrv.interfaces.brRtr.mask}' > /etc/net/ifaces/${devices.brSrv.interfaces.brRtr.name}/ipv4address
echo 'default via ${devices.brRtr.interfaces.brSrv.ip}' > /etc/net/ifaces/${devices.brSrv.interfaces.brRtr.name}/ipv4route
echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${devices.brSrv.interfaces.brRtr.name}/resolv.conf
systemctl restart network
ip -br a
</code></pre></p>
<br>
<p>Запуск HQ-SRV</p>
<p><code>hostnamectl hostname HQ-SRV.au-team.irpo ; exec bash</code></p>
<p>Настраиваем статичный IP</p>
<p><pre><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${devices.hqSrv.interfaces.hqRtr.name}/options
echo '${devices.hqSrv.interfaces.hqRtr.ip}/${devices.hqSrv.interfaces.hqRtr.mask}' > /etc/net/ifaces/${devices.hqSrv.interfaces.hqRtr.name}/ipv4address
echo 'default via ${devices.hqSrv.interfaces.hqRtr.gateway}' > /etc/net/ifaces/${devices.hqSrv.interfaces.hqRtr.name}/ipv4route
echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${devices.hqSrv.interfaces.hqRtr.name}/resolv.conf
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
echo '${devices.hqRtr.interfaces.hqSrv.ip}/${devices.hqRtr.interfaces.hqSrv.mask}' >> /etc/net/ifaces/vlan100/ipv4address
echo '${devices.hqRtr.interfaces.hqCli.ip}/${devices.hqRtr.interfaces.hqCli.mask}' >> /etc/net/ifaces/vlan200/ipv4address
echo '${devices.hqRtr.interfaces.vlan999.ip}/${devices.hqRtr.interfaces.vlan999.mask}' >> /etc/net/ifaces/vlan999/ipv4address
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
  <p>Указываем статичный ipv4 адрес для ${devices.brSrv.interfaces.brRtr.name}</p>
  <p><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${devices.hqCli.interfaces.hqRtr.name}/options</code></p>
  <p>Настраиваем IP-адрес</p>
  <p><code>echo '${devices.hqCli.interfaces.hqRtr.ip}/${devices.hqCli.interfaces.hqRtr.mask}' > /etc/net/ifaces/${devices.hqCli.interfaces.hqRtr.name}/ipv4address</code></p>
  <p>Настраиваем шлюз</p>
  <p><code>echo 'default via ${devices.hqCli.interfaces.hqRtr.ip}' > /etc/net/ifaces/${devices.hqCli.interfaces.hqRtr.name}/ipv4route</code></p>
  <p>Указываем DNS</p>
  <p><code>echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${devices.hqCli.interfaces.hqRtr.name}/resolv.conf</code></p>
  <p><code>systemctl restart network</code></p>
  <p><code>ip -br a</code></p>
  <p><code>ping ${devices.hqCli.interfaces.hqRtr.ip}</code></p>
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
<p>Local ip: <code>${devices.hqRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${devices.brRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${devices.hqRtr.interfaces.brRtr.ip}/${devices.hqRtr.interfaces.brRtr.mask}</code></p>
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
<p>Local ip: <code>${devices.brRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${devices.hqRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${devices.brRtr.interfaces.hqRtr.ip}/${devices.brRtr.interfaces.hqRtr.mask}</code></p>
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
network ${devices.hqRtr.interfaces.brRtr.netAddress}/${devices.hqRtr.interfaces.brRtr.mask} area 0
network ${devices.hqRtr.interfaces.hqSrv.netAddress}/${devices.hqRtr.interfaces.hqSrv.mask} area 0
network ${devices.hqRtr.interfaces.hqCli.netAddress}/${devices.hqRtr.interfaces.hqCli.mask} area 0
network ${devices.hqRtr.interfaces.vlan999.netAddress}/${devices.hqRtr.interfaces.vlan999.mask} area 0
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
network ${devices.brRtr.interfaces.hqRtr.netAddress}/${devices.brRtr.interfaces.hqRtr.mask} area 0
network ${devices.brRtr.interfaces.brSrv.netAddress}/${devices.brRtr.interfaces.brSrv.mask} area 0
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
option domain-name-servers ${devices.hqSrv.interfaces.hqRtr.ip};

ddns-update-style interim;
update-static-leases on;

zone au-team.irpo {
&#9;primary ${devices.hqSrv.interfaces.hqRtr.ip};
}

zone ${getReverseZone(devices.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa {
&#9;primary ${devices.hqSrv.interfaces.hqRtr.ip};
}

zone ${getReverseZone(devices.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa {
&#9;primary ${devices.hqSrv.interfaces.hqRtr.ip};
}

subnet ${devices.hqRtr.interfaces.hqCli.netAddress} netmask ${cidrToMask(devices.hqRtr.interfaces.hqCli.mask)} {
&#9;range ${devices.hqCli.interfaces.hqRtr.ip} ${getRangeFor3(devices.hqCli.interfaces.hqRtr.ip)};
&#9;option routers ${devices.hqRtr.interfaces.hqCli.ip};
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
<p><pre><code>zone "au-team.irpo" {
&#9;type master;
&#9;file "au-team.db";
&#9;allow-update { any; };
};

zone "${getReverseZone(devices.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa" {
&#9;type master;
&#9;file "100.db";
&#9;allow-update { any; };
};

zone "${getReverseZone(devices.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa" {
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
<p><pre><code>@&#9;IN&#9;SOA&#9;${getReverseZone(devices.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa. root.${getReverseZone(devices.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa. (</code></pre></p>
<br>
<pre><code>&#9;&#9;&#9;)</code></pre>
<pre><code>&#9;IN&#9;NS&#9;${getReverseZone(devices.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa.
&#9;IN&#9;A&#9;${devices.hqSrv.interfaces.hqRtr.ip}
${getLastOctet(devices.hqSrv.interfaces.hqRtr.ip)}&#9;IN&#9;PTR&#9;hq-srv.au-team.irpo.
${getLastOctet(devices.hqRtr.interfaces.hqSrv.ip)}&#9;IN&#9;PTR&#9;hq-rtr.au-team.irpo.
</code></pre>
<br>
<p><code>cp zone/100.db zone/200.db</code></p>
<p><code>vim zone/200.db</code></p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p><pre><code>@&#9;IN&#9;SOA&#9;${getReverseZone(devices.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa. root.${getReverseZone(devices.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa. (</code></pre></p>
<br>
<p><pre><code>&#9;&#9;&#9;)</code></pre></p>
<p><pre><code>&#9;IN&#9;NS&#9;${getReverseZone(devices.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa.
&#9;IN&#9;A&#9;${devices.hqSrv.interfaces.hqRtr.ip}
${getLastOctet(devices.hqCli.interfaces.hqRtr.ip)}&#9;IN&#9;PTR&#9;hq-cli.au-team.irpo.
${getLastOctet(devices.hqRtr.interfaces.hqCli.ip)}&#9;IN&#9;PTR&#9;hq-rtr.au-team.irpo.
</code></pre></p>
<br>
<p><code>vim zone/au-team.db</code></p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p><pre><code>@&#9;IN&#9;SOA&#9;hq-srv.au-team.irpo. root.au-team.irpo. (</code></pre></p>
<br>
<p><pre><code>&#9;&#9;&#9;)</code></pre></p>
<p><pre><code>
&#9;IN&#9;NS&#9;hq-srv.au-team.irpo.
&#9;IN&#9;A&#9;${devices.hqSrv.interfaces.hqRtr.ip}
hq-rtr&#9;IN&#9;A&#9;${devices.hqRtr.interfaces.hqSrv.ip}
br-rtr&#9;IN&#9;A&#9;${devices.brRtr.interfaces.brSrv.ip}
hq-srv&#9;IN&#9;A&#9;${devices.hqSrv.interfaces.hqRtr.ip}
hq-cli&#9;IN&#9;A&#9;${devices.hqCli.interfaces.hqRtr.ip}
br-srv&#9;IN&#9;A&#9;${devices.brSrv.interfaces.brRtr.ip}
wiki&#9;IN&#9;CNAME&#9;hq-rtr.au-team.irpo.
moodle&#9;IN&#9;CNAME&#9;hq-rtr.au-team.irpo.
</code></pre></p>
<br>
<p><code>rndc-confgen > rndc.key</code></p>
<p><code>sed -i '6,$d' rndc.key</code></p>
<p><code>chgrp -R named zone/</code></p>
<p><code>named-checkconf</code></p>
<p><code>named-checkconf -z</code></p>
<p><code>echo -e 'nameserver ${devices.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf</code></p>
<p><code>systemctl restart network</code></p>
<p><code>systemctl enable --now bind</code></p>
<br>
<p>BR-RTR</p>
<p><pre><code>echo -e 'nameserver ${devices.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf
systemctl restart network
</code></pre></p>
<br>
<p>BR-SRV</p>
<p><pre><code>echo -e 'nameserver ${devices.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf
systemctl restart network
</code></pre></p>
<br>
<p>HQ-RTR</p>
<p><pre><code>echo -e 'nameserver ${devices.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf
systemctl restart network
</code></pre></p>
<br>
<p>HQ-CLI</p>
<p><pre><code>echo -e 'nameserver ${devices.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf
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
<p><code>samba-tool dns add br-srv.au-team.irpo au-team.irpo hq-rtr A ${devices.hqRtr.interfaces.hqSrv.ip} -U Administrator</code></p>
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
<p><pre><code>echo -e 'search au-team.irpo\\nnameserver ${devices.brSrv.interfaces.brRtr.ip}' > /etc/resolv.conf
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
<p><code>mdadm --detail --scan | tee a /etc/mdadm.conf</code></p>
<p><code>mkfs.ext4 /dev/md0</code></p>
<p><code>mkdir -p /raid5</code></p>
<p><code>blkid /dev/md0 >> /etc/fstab</code></p>
<p><code>vim /etc/fstab</code></p>
<p>в последней строке оставляем только UUID и приписываем /raid5 ext4 defaults 0 0 </p>
<p>сохраняем</p>
<p>проверяем что пространство монтируется</p>
<p><code>mount -a</code></p>
<p>ошибок не должно быть</p>
<p><code>apt-get install -y nfs-server</code></p>
<p><code>mkdir -p /raid5/nfs</code></p>
<p><code>vim /etc/exports</code></p>
<p>добавляем второй строкой /raid5/nfs ${devices.hqCli.interfaces.hqRtr.ip}(rw,sync,no_subtree_check)</p>
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
<p>${devices.hqSrv.interfaces.hqRtr.ip}:/raid5/nfs /mnt/nfs nfs defaults 0 0</p>
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
server ${devices.hqRtr.interfaces.hqSrv.ip} iburst
local stratum 5

allow ${devices.hqRtr.interfaces.hqSrv.netAddress}/${devices.hqRtr.interfaces.hqSrv.mask}
allow ${devices.hqRtr.interfaces.hqCli.netAddress}/${devices.hqRtr.interfaces.hqCli.mask}
allow ${devices.brRtr.interfaces.brSrv.netAddress}/${devices.brRtr.interfaces.brSrv.mask}
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
<p><code>echo -e "[all]\\nhq-srv ansible_host=${devices.hqSrv.interfaces.hqRtr.ip} ansible_connection=local\\nhq-cli ansible_host=${devices.hqCli.interfaces.hqRtr.ip} ansible_connection=local\\nhq-rtr ansible_host=${devices.hqRtr.interfaces.hqSrv.ip} ansible_connection=local\\nbr-rtr ansible_host=${devices.brRtr.interfaces.brSrv.ip} ansible_connection=local" | sudo tee /etc/ansible/hosts > /dev/null</code></p>
<p>или</p>
<p><code>vim /etc/ansible/hosts</code></p>
<p><code>[all]</code></p>
<p><code>hq-srv ansible_host=${devices.hqSrv.interfaces.hqRtr.ip} ansible_connection=local</code></p>
<p><code>hq-cli ansible_host=${devices.hqCli.interfaces.hqRtr.ip} ansible_connection=local</code></p>
<p><code>hq-rtr ansible_host=${devices.hqRtr.interfaces.hqSrv.ip} ansible_connection=local</code></p>
<p><code>br-rtr ansible_host=${devices.brRtr.interfaces.brSrv.ip} ansible_connection=local</code></p>
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
<p><code>scp -P 2024 /home/user/Downloads/LocalSettings.php sshuser@${devices.brSrv.interfaces.brRtr.ip}:/root/</code></p>
<p>BR-SRV</p>
<p>Раскомментировать строчку в wiki.yml</p>
<br>
<h3>Задание 6</h3>
<p>HQ-RTR</p>
<p><code>iptables -t nat -A PREROUTING -p tcp --dport 22 -j DNAT --to-destination ${devices.hqSrv.interfaces.hqRtr.ip}:2024</code></p>
<p><code>iptables-save >> /etc/sysconfig/iptables</code></p>
<p>BR-RTR</p>
<p><code>iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination ${devices.brSrv.interfaces.brRtr.ip}:8080</code></p>
<p><code>iptables -t nat -A PREROUTING -p tcp --dport 22 -j DNAT --to-destination ${devices.brSrv.interfaces.brRtr.ip}:2024</code></p>
<p><code>iptables-save >> /etc/sysconfig/iptables</code></p>
<br>
<h3>Задание 7</h3>
<p>HQ-SRV</p>
<p><code>apt-get install -y moodle moodle-apache2 moodle-local-mysql php8.1 php8.1-mysqli php8.1-xml php8.1-mbstring mariadb-server</code></p>
<p><code>systemctl restart mariadb</code></p>
<p><code>systemctl enable --now mariadb</code></p>
<p><code>mysql_secure_installation</code></p>
<p><code>mysql -u root -p</code></p>
<p><code>CREATE DATABASE moodledb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;</code></p>
<p><code>CREATE USER 'moodle'@'localhost' IDENTIFIED BY 'P@ssw0rd';</code></p>
<p><code>GRANT ALL PRIVILEGES ON moodledb.* TO 'moodle'@'localhost';</code></p>
<p><code>FLUSH PRIVILEGES;</code></p>
<p><code>exit</code></p>
<p><code>cd /var/www/webapps/moodle</code></p>
<p><code>cp config-dist.php config.php</code></p>
<p><code>vim config.php</code></p>
<p><code>mkdir /var/moodledata</code></p>
<p><code>chown -R apache:apache /var/moodledata</code></p>
<p><code>chmod -R 0777 /var/moodledata</code></p>
<p><code>a2enmod rewrite</code></p>
<p><code>nano /etc/php/8.2/apache2-mod_php/php.ini</code></p>
<p><code>systemctl restart httpd2.service</code></p>
<p><code>systemctl enable --now httpd2.service</code></p>
<h3>Задание 8</h3>
<p>HQ-RTR</p>
<p><code>apt-get install -y nginx</code></p>
<p><code>vim /etc/nginx/sites-available.d/proxy.conf</code></p>
<p><pre><code>
server {
  listen 80;
  server_name moodle.au-team.irpo;

  location / {
    proxy_pass http://${devices.hqSrv.interfaces.hqRtr.ip};
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
    proxy_pass http://${devices.brSrv.interfaces.brRtr.ip};
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
`;
