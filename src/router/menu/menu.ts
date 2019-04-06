import { Condition } from "@/utils/permission-expression";
import { ExtendedVue } from 'vue/types/vue';

interface Menu {
  /** Name of this menu (i18n is not considered) */
  name: string;
  /** Menu group doesn't have url */
  url?: string;
  /** Use name or url as key is not recommanded */
  key: string;
  /** Sort */
  sort: number;
  /** Children menu */
  children: Menu[];
  /** Vue component */
  component?: () => Promise<typeof import("*.vue")> | typeof import('*.vue');
  /** String list based permission checking */
  permission: Condition<string>;
}

var a = () => import('@/components/App.vue');
