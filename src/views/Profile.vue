<template>
  <div class="profile">
    This is you!
  </div>
  <p>
    {{ email }}
  </p>
  <p>
    {{ name }}
  </p>
  <p>
    {{ rank }}
  </p>
  <div class="container">
    <template v-for="(lane, group) in lanes" :key="lane">
      <div v-bind:class="{
        'order1': group == 'prefLevel',
        'order2': group == 'champPool'
      }">
        <h4>
          {{group}}
        </h4>
        <p v-for="(lan, useless, i) in lane" :key="lan">
          <template v-if="group == 'prefLevel'">
            {{ i + 1 }}
          </template>
          {{ lan }}
        </p>
      </div>
    </template>
  </div>
  <p>
    {{ matches }}
  </p>
</template>

<script>
import firebase from 'firebase/compat/app'
import { ref } from 'vue'
import { getUser, getRanks } from '@/main.js'

export default{
    setup() {
        let email = ref('')
        let uid = ref('')
        let name = ref('')
        let rank = ref('')
        let lanes = ref('')
        let matches = ref('')

        firebase.auth().onAuthStateChanged(function(user) {
            //Nope you don't belong here check
            if (!user) {
                window.location.href = '/login'
                return
            }
            email.value = user.email
            uid.value = user.uid
        });
        
        getUser('GYOaWqZzG7dGRr7GOSbIsqK5mrW2')
          .then(data => {
            name.value = data[0].lolName
            rank.value = data[0].rank
            lanes.value = data[0].lanes
            matches.value = data[0].matches
          })
          
        getRanks()
          .then(data => {
            rank.value = data[rank.value]
          })

        return {
            email, name, rank, lanes, matches
        }
    }
}
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    flex-direction: column;
  }

  .order1{
    order: 1
  }
  .order2{
    order: 2
  }
</style>