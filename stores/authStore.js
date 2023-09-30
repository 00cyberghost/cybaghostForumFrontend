/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
import { defineStore } from 'pinia'
import { useUtils } from '../composables/useUtils'
export const useAuthStore = defineStore({
    id: 'authstore',
    state: () => ({ 
      
      user: null,

      TOKEN: null,

      url: useRuntimeConfig().public.baseURL,

      image_url : 'https://api.cybaghost.com.ng/images',
      // isAuth : () => {

      //   let tok = JSON.parse(localStorage.getItem('TOKEN'))

      //   if(tok == null){
      //     return false
      //   }else{
      //     return true
      //   }
      // }

      


    }),
    persist: true,
    getters: {
      doubleCount: (state) => state.count * 2
    },
    actions: {

      isAuth(){
        return JSON.parse(localStorage.getItem('user')) != null ? true : false
      },

      logout() {
        
        localStorage.removeItem('user')
        localStorage.removeItem('TOKEN')
        this.user = null
        this.TOKEN = null
        //this.isAuth = false
        navigateTo('/')
        
      },
      login(form) {

        localStorage.setItem('user', JSON.stringify(form.user[0]))
        localStorage.setItem('TOKEN', JSON.stringify(form.token))
        this.user = form.user[0]
        this.TOKEN = form.token
        this.isAuth = true
        navigateTo('/dashboard')
        this.fetchNotifications()
        
        

      },
      fetchNotifications() {

          myFetch('/notification/unread/count')
          .then(data => {
              if(data[0].count > 0){

                  let el = document.getElementById('notification-count')
                  el.textContent = data[0].count
                  el.classList.remove('hidden')
                  let el2 = document.getElementById('notification-count-mobile')
                  el2.textContent = data[0].count
                  el2.classList.remove('hidden')
              }
              
          })
      }

      
      
      
    }
    

  })