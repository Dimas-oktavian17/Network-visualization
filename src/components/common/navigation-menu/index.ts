import { ref } from 'vue';
import { useRoute } from 'vue-router';

function NavMenuComposable() {
  const route = useRoute();
  const openDropdown = ref<string | null>(null);
  const mobileOpen = ref<boolean>(false);

  const navRoutes = ref([
    {
      name: 'home',
      routes: [
        { name: 'home', path: '/' },
      ]
    },
    {
      name: 'docs',
      routes: [
        { name: 'guide-introduction', path: '/guide/introduction' },
        { name: 'guide-quickstart', path: '/guide/quickstart' },
        { name: 'tutorial', path: '/tutorial' },
        { name: 'examples', path: '/examples' },
        { name: 'glossary', path: '/glossary' },
      ]
    },
  ]);

  const toggleDropdown = (name: string) => {
    openDropdown.value = openDropdown.value === name ? null : name;
  };

  const isActiveDropdown = (routes: Array<{ name: string; path: string; }>) => {
    return routes.some(r => r.name === route.name);
  };

  return {
    openDropdown,
    toggleDropdown,
    isActiveDropdown,
    navRoutes,
    mobileOpen,
  };
}
export default NavMenuComposable;