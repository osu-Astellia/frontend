<template>
<div>
  <div class="payment__check__container">


      <div class="payment__checked">

            <div class="payment__thanks_title" v-if="status == 'PAID'">
              Thanks for your purchase, {{ user }}, now you can use all the privileges on our servers! 

              <div class="payment__thanks__small">
                  If you are not satisfied with something, you can contact our project administration.
              </div>
  
            </div>
            
            <div class="payment__begin__checked" v-else-if="status == 'BEGIN_CHECKED'">
                Your payment is begin checked!
            </div>
            <div class="payment__check__failed" v-else>
                Oops! It looks like you didn't succeed with the transaction! Please, try again.
            </div>

        </div>  
    </div>  
</div>
  
</template>

<script>
export default {

    data(){
        return {
            status: 'BEGIN_CHECKED',
            user: ''
        }
        
    },
    methods: {
        async checkPayment(id){
            let status = await fetch(`https://fbk.sh/frontend/api/v1/donations/check?id=${id}`).then(res => res.json());
            if(status.result){
                this.user =  status.result ? status.result.username : 'Guest';
                this.status = 'PAID';
                return;
            }
            switch(status.message){
                case 'BILL_NOT_FOUND':
                    this.status = 'BILL_NOT_FOUND';
                    break;
                default:
                    this.status = 'UNKNOWN';
                    break;
            }
        }
    },
    async mounted(){
        this.checkPayment(this.$route.query.id)
    }

}
//http://localhost:8080/payments/check?id=3D6161b8f1-57c0-4b6f-bfb6-d6a26af2e705
</script>

<style>
.payment__thanks_title {
    font-size: 32px;
}

.payment__begin__checked {
    font-size: 32px;
}

.payment__check__failed {
    font-size: 32px;
}
</style>


