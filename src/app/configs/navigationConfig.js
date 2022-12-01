import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'home',
    title: 'Home',
    translate: 'Home',
    type: 'item',
    icon: 'leaderboard',
    url: 'home',
  },
  {
    id: 'controlePedidos',
    title: 'Controle de Pedidos',
    translate: 'Controle de Pedidos',
    type: 'item',
    icon: 'point_of_sale',
    url: 'controle-pedidos',
  },
  {
    id: 'cadastros',
    title: 'Cadastros',
    translate: 'Cadastros',
    type: 'collapse',
    icon: 'format_list_bulleted',
    children: [
      {
        id: 'cadastroCliente',
        title: 'Clientes',
        type: 'item',
        url: 'clientes',
      },
      {
        id: 'cadastroProduto',
        title: 'Produtos',
        type: 'item',
        url: 'produtos',
      },
    ],
  },
  {
    id: 'configuracoes',
    title: 'Configurações',
    translate: 'Configurações',
    type: 'collapse',
    icon: 'settings',
    children: [
      {
        id: 'configuracoesEmail',
        title: 'E-mail',
        type: 'item',
        url: 'configuracoes/email',
      },
    ],
  },
];

export default navigationConfig;
