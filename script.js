const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);

let qtModal = 1;
let cart = [];
let modalKey = 0;


pizzaJson.map((item, index) => {
   let pizzaItem = qs('.models .pizza-item').cloneNode(true);                   // clonou o pizza item 

   pizzaItem.setAttribute('data-key', index);
   pizzaItem.querySelector('.pizza-item--img img').src = item.img;
   pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
   pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        qtModal = 1;
        modalKey = key;

        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';

        setTimeout(()=> {
            qs('.pizzaWindowArea').style.opacity = 1
        }, 200);
    
        
        qs('.pizzaBig img').src = pizzaJson[key].img;
        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        qs('.pizzaInfo--actualPrice').innerHTML = ` R$ ${pizzaJson[key].price.toFixed(2)}`;
        qs('.pizzaInfo--size.selected').classList.remove('selected');
        qsa('.pizzaInfo--size').forEach((size, sizeIndex)=> {
            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        });

        qs('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
            if(qtModal > 1){
                qtModal--;
                qs('.pizzaInfo--qt').innerHTML = qtModal;
            }
        })

        qs('.pizzaInfo--qtmais').addEventListener('click', ()=>{
            qtModal++;
            qs('.pizzaInfo--qt').innerHTML = qtModal;
        })

    });

    qs('.pizza-area').append(pizzaItem);                                      // colocou no browser
});

const closeModal = () => {
        qs('.pizzaWindowArea').style.opacity = 0;
        
        setTimeout(()=> {
            qs('.pizzaWindowArea').style.display = 'none';    // fecha o modal
        }, 500);
        
    }


qsa('.pizzaInfo--cancelButton','.pizzaInfo--cancelMobileButton')
    .forEach((item)=>{
    item.addEventListener('click', closeModal)
    })
    

qsa('.pizzaInfo--size').forEach((size, sizeIndex) =>{
    size.addEventListener('click', (e)=>{
        qs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});


qs('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id +'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);
        if(key > -1){
            cart[key].qt = qtModal;
        } else{
            cart.push({
                identifier,
                id: pizzaJson[modalKey].id,
                size,
                qt: qtModal
               })
        }

    closeModal()
})