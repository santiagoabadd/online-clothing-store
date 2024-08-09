import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ShoppingBagIcon,ChevronDownIcon, MagnifyingGlassIcon, UserIcon, Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/home', current: true },
  { name: 'Products', href: '/products', current: false, categories: ['All','Accessories', 'Bags', 'Beauty', 'Clothes', 'Gifts', 'Shoes'] },
  { name: 'My Orders', href: '/orders', current: false },
  { name: 'About Us', href: '#', current: false },
];

interface NavBarProps {
  onOpenCart: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onOpenCart }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = React.useState(false);

  return (
    <Disclosure as="nav" className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between">
        <div className="flex flex-shrink-1 items-center">
              <img
                alt="Your Company"
                src="/img/pngegg.png"              
                className="h-6 w-auto"
              />
            </div>
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="sm:items-stretch sm:justify-start">
            
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  item.name === 'Products' ? (
                    <div key={item.name} className="relative relative z-10">
                      <button
                        onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                        className={"nav-button-display"}
                      >
                        {item.name}
                        <ChevronDownIcon aria-hidden="true" className="h-4 w-4" />
                      </button>
                      {productsDropdownOpen && (
                        <div className="absolute mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {item.categories?.map((category) => (
                            <a
                              key={category}
                              href={`/products/${category.toLowerCase()}`}
                              className="category-display"
                            >
                              {category}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`nav-button`}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  )
                ))}
              </div>
            </div>
            
          </div>
          
          {searchOpen && (
            <div className="flex justify-center p-4 ">
              <input
                type="text"
                placeholder="Search..."
                className="w-full max-w-lg p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative transition-transform duration-300 transform hover:scale-150 mr-3"
              onClick={onOpenCart}  
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <ShoppingBagIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="relative transition-transform duration-300 transform hover:scale-150 mr-3"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Search</span>
              <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="relative transition-transform duration-300 transform hover:scale-150"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex transition-transform duration-300 transform hover:scale-150">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <UserIcon className="h-6 w-6" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            item.name === 'Products' ? (
              <div key={item.name} className="relative relative z-10">
                <DisclosureButton
                  as="button"
                  onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${item.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
                {productsDropdownOpen && (
                  <div className="mt-2 space-y-1">
                    {item.categories?.map((category) => (
                      <DisclosureButton
                        key={category}
                        as="a"
                        href="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700"
                      >
                        {category}
                      </DisclosureButton>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${item.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </DisclosureButton>
            )
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};