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
    id: 'contatos',
    title: 'Contatos',
    translate: 'Contatos',
    type: 'item',
    icon: 'group',
    url: 'contacts',
  },
  {
    id: 'mensageria',
    title: 'Mensageria',
    translate: 'Mensageria',
    type: 'collapse',
    icon: 'message',
    children: [
      {
        id: 'whatsapp',
        title: 'WhatsApp',
        type: 'item',
        url: 'mensageria/whatsapp',
      },
    ],
  },
  {
    id: 'repositorios',
    title: 'Repositórios',
    translate: 'Repositorios',
    type: 'collapse',
    icon: 'download',
    children: [
      {
        id: 'tabelaAuxiliar',
        title: 'Tabela auxiliar',
        type: 'item',
        url: 'repositorios/tabela-auxiliar',
      },
    ],
  },
  {
    id: 'integracoes',
    title: 'Integrações',
    translate: 'Integrações',
    type: 'collapse',
    icon: 'compare_arrows',
    children: [
      {
        id: 'integracoesUau',
        title: 'UAU',
        type: 'item',
        url: 'integracoes/uau',
      },
      {
        id: 'integracoesPolichat',
        title: 'Polichat',
        type: 'item',
        url: 'integracoes/polichat',
      },
      {
        id: 'integracoesCapys',
        title: 'Capys',
        type: 'item',
        url: 'integracoes/capys',
      },
      {
        id: 'integracoesRdStation',
        title: 'RD Station',
        type: 'item',
        url: 'integracoes/rd-station',
      },
      {
        id: 'integracoesSienge',
        title: 'Sienge',
        type: 'item',
        url: 'integracoes/sienge',
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
