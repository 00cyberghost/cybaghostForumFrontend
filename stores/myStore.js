/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
import { defineStore } from 'pinia'
export const useMyStore = defineStore({
    id: 'mystore',
    state: () => ({ 

    //   user: { 
    //     data: JSON.parse(localStorage.getItem('user')),
        
    //     token: JSON.parse(localStorage.getItem('TOKEN'))
    //   },

    //   quotation: null,

    //   url: import.meta.env.VITE_API_BASE_URL

    isDark: 'light',


    }),
    getters: {
      doubleCount: (state) => state.count * 2
    },
    actions: {

      logout(form) {
        // if(form.success == true){

        //   localStorage.removeItem('user')
        //   localStorage.removeItem('TOKEN')
        //   this.user.data = {}
        //   this.user.token = null
        //   router.push('/')
        // }
      },
      

      toggleMode(){
        
        let item = localStorage.getItem('theme')
        
        if(item == 'dark') {
            
            document.documentElement.classList.add('dark')
            this.isDark = 'dark'

        }else{

            document.documentElement.classList.remove('dark')
        }
      },

      tmode() {

          let item = localStorage.getItem('theme')
          if(item == 'dark') {
              
              this.lightMode()
              this.isDark = 'light'
      
          }else{
      
              this.darkMode()
              this.isDark = 'dark'
          }
      },
      
      lightMode() {
          if(localStorage.getItem('theme') != null) localStorage.removeItem('theme')
          document.querySelector('html').removeAttribute('class')   
      },
      darkMode() {
        if(localStorage.getItem('theme') == null) localStorage.setItem('theme','dark')
          document.querySelector('html').setAttribute('class','dark')
      },

      
      
      
    }
    

  })