import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// app.use(createPinia())
//persistedstate 라이브러리 사용 시 기존 피니아일 때의 코드(line10)를 아래(line12)와 같이 수정해야한다.
app.use(pinia)

app.mount('#app')
