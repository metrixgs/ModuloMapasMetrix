import { createTheme } from "flowbite-react";

export const themeOptions = {
  dark: "dark",
  light: "light",
};

export const customTheme = createTheme({
  navbar: {
    root: {
      base: "bg-white px-2 py-2.5 sm:px-4 dark:border-gray-700 dark:bg-metrixblack-800"
    }
  },
  popover: {
    base: "absolute z-20 inline-block w-max max-w-[100vw] rounded-2xl border border-gray-200 bg-white shadow-sm outline-none dark:border-gray-600 dark:bg-metrixblack-800"
  },
  drawer: {
    root: {
      base: "fixed z-[1000] overflow-y-auto bg-white p-4 transition-transform dark:bg-metrixblack-800",
      backdrop: "fixed inset-0 z-[999] bg-gray-900/50 dark:bg-gray-900/80"
    }
  },
  modal: {
    root: {
      base: "fixed inset-x-0 top-0 z-[1000] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
    },
    content: {
      inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-metrixblack-800"
    },
    body: {
      base: "flex-1 overflow-auto p-6 text-gray-900 dark:text-white"
    },
    header: {
      base: "flex items-start justify-between rounded-t border-b p-5 border-primary-300 dark:border-primary-800",
      title: "text-xl font-medium text-primary-500 dark:text-primary-500",
      close: {
        base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-primary-200 hover:text-gray-900 dark:hover:bg-metrixblack-600 dark:hover:text-white"
      }
    },
    footer: {
      base: "flex items-center space-x-2 rounded-b p-6 border-primary-300 dark:border-primary-800"
    }
  },
  tabs: {
    tablist: {
      tabitem: {
        variant: {
          default: {
            active: {
              on: "text-primary-600 bg-primary-300/25 dark:bg-primary-300/20 dark:text-primary-500",
              off: "text-gray-500 hover:bg-primary-300/10 hover:text-gray-600 dark:text-gray-400 dark:hover:dark:bg-primary-300/15 dark:hover:text-gray-300"
            }
          }
        }
      }
    }
  },
  rangeSlider: {
    field: {
      input: {
        base: "w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-metrixblack-600"
      }
    }
  }
})