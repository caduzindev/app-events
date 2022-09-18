# Api de gestão de eventos
Antes de começar você precisa criar um conta no [STRIPE](https://stripe.com/br) e ativar o [STRIPE CONNECT](https://stripe.com/docs/connect) e por ultimo baixe o [STRIPE CLI](https://stripe.com/docs/stripe-cli)
## Faça Login
```bash
$ stripe login
```
## Registre o evento
```bash
$ stripe trigger payment_intent.succeeded
```

## Configure suas variaveis de ambiente
- Copie o `.env.example` para `.env`
- Dentro do novo arquivo preencha as variavies `STRIPE_DEVICE_NAME`, `STRIPE_API_KEY`, `STRIPE_ENDPOINT_SECRET` com suas credencias do Stripe
- A variavel `STRIPE_ENDPOINT_SECRET` você consegue acessando `Dashboard->Desenvolvedores->Webhooks->Adicionar um ouvinte local` dentro do codigo vai estar uma variavel chamada `endpointSecret` com a informação que você precisa
- No caso do `SECRET_JWT` você pode colocar qualquer coisa

## Rodando Aplicação
### **Start**
```bash
$ docker-compose up -d
```
### **End**
```bash
$ docker-compose down
```
### **API**
Agora a api estará rodando em `localhost:3333`

Agora e so testar :)