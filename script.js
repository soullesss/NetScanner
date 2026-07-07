const form = document.querySelector("#scanForm");
const output = document.querySelector("#output");

const scanProfiles = {
  tcp: {
    label: "TCP connect",
    nmapArgs: "-sT -sV -T3",
    note: "Funciona sem privilegio elevado e deixa a decisao explicita.",
  },
  syn: {
    label: "SYN scan",
    nmapArgs: "-sS -sV -T3",
    note: "Use somente quando o ambiente permitir e o operador tiver privilegio.",
  },
  service: {
    label: "Service detection",
    nmapArgs: "-sV --version-light -T3",
    note: "Prioriza identificacao de servico com menos agressividade.",
  },
};

function parsePorts(rawPorts) {
  const ports = rawPorts
    .split(",")
    .map((port) => Number.parseInt(port.trim(), 10))
    .filter((port) => Number.isInteger(port));

  const uniquePorts = [...new Set(ports)];
  const invalidPort = uniquePorts.find((port) => port < 1 || port > 65535);

  if (!uniquePorts.length || invalidPort) {
    throw new Error("Informe portas validas entre 1 e 65535.");
  }

  return uniquePorts.sort((left, right) => left - right);
}

function validateTarget(target) {
  const cleanTarget = target.trim();
  const ipv4Block = "(25[0-5]|2[0-4]\\d|1?\\d?\\d)";
  const ipv4Pattern = new RegExp(`^${ipv4Block}(\\.${ipv4Block}){3}(\\/([0-9]|[1-2][0-9]|3[0-2]))?$`);
  const hostnamePattern = /^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

  if (!cleanTarget || (!ipv4Pattern.test(cleanTarget) && !hostnamePattern.test(cleanTarget))) {
    throw new Error("Use um IPv4, CIDR ou hostname valido dentro do seu escopo.");
  }

  return cleanTarget;
}

function buildPlan(formData) {
  const target = validateTarget(formData.get("target"));
  const ports = parsePorts(formData.get("ports"));
  const mode = formData.get("scanMode");
  const profile = scanProfiles[mode] ?? scanProfiles.tcp;

  return [
    "[ok] Escopo declarado pelo operador",
    `     alvo: ${target}`,
    `     portas: ${ports.join(",")}`,
    "",
    "[ok] Perfil selecionado",
    `     modo: ${profile.label}`,
    `     nmap: ${profile.nmapArgs} -p ${ports.join(",")} ${target}`,
    `     nota: ${profile.note}`,
    "",
    "[opsec] Guardrails aplicados",
    "     - nao registrar tokens, cookies ou segredos",
    "     - separar log humano de log estruturado",
    "     - limitar threads e timing antes de qualquer rede real",
    "     - abortar se o alvo sair do escopo autorizado",
    "",
    "[proximo passo]",
    "     implementar CLI Python com click, pydantic, loguru e wrapper seguro de nmap",
  ].join("\n");
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const isAuthorized = document.querySelector("#authorized")?.checked;

  try {
    if (!isAuthorized) {
      throw new Error("Sem autorizacao explicita, o plano nao deve seguir.");
    }

    output.textContent = buildPlan(formData);
  } catch (error) {
    output.textContent = `[bloqueado] ${error.message}`;
  }
});
