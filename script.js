let items = []
function getMenu(){
    let menuCard = document.getElementById("menuCard")
    menuCard.innerHTML = ""
    fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
        .then((res)=>res.json())
        .then((res)=>{
            items = res
            res.map((ele)=>{
                menuCard.innerHTML+=`                    <div class="div5">
                        <img src="${ele.imgSrc}" alt="">
                        <div class="div4">
                            <div>
                                <h3>${ele.name}</h3>
                                <p>$${ele.price}/-</p>
                            </div>
                            <button>+</button>
                        </div>
                    </div>`
            })
        })
        .catch(err=>console.log("error",err))
}
getMenu()
function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            let order = [];
            while (order.length < 3) {
                let randomIndex = Math.floor(Math.random() * items.length);
                let selectedItem = {name:items[randomIndex].name,price:items[randomIndex].price}
                if (!order.includes(selectedItem)) {
                    order.push(selectedItem);
                }
            }


            resolve(order);
        }, 2500);
    });
}
function orderPrep(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({order_status:true, paid:false})
        },1500)
    })
}
function payOrder(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({order_status:true, paid:true})
        },1000)
    })
}
function thankyouFnc(){
    alert("thankyou for eating with us today!")
}
takeOrder()
    .then((res)=>{
    console.log("Your Order:",res)
    return orderPrep()
    })
    .then((res)=>{
        console.log("Order Preparation Status:",res)
        return payOrder()
    })
    .then((res)=>{
        console.log("Payment Status:",res)
        return thankyouFnc()
    })
    .catch(err=>console.log("error",err))