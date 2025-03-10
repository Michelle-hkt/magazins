





// ********************************** PRODUIT*******************************

// <<<<<<<<<<<<<<<<<<<<ajout d'un produit>>>>>>>>>>>>>>>>>>>>

const productProcedure = {
    addProduct:()=>{
        const modalTag = document.querySelector('.modal__form')
        console.log(modalTag)
        const closeFormTag = document.querySelector('.close_form')
        console.log(closeFormTag)
        const buttonAddTag = document.querySelector('.main__content__top__left__btn')
        console.log(buttonAddTag)
        if(buttonAddTag){
            buttonAddTag.addEventListener('click',e =>{
                e.preventDefault()
                modalTag.classList.add('modal__active')
                closeFormTag.addEventListener('click',e =>{
                    e.preventDefault()
                    modalTag.classList.remove('modal__active')
                })
            })
        }
    },

    // <<<<<<<<<<<<<<<<<<<<initialiser un dépot>>>>>>>>>>>>>>>>>>>>

    initLocalStorage:() =>{
        const productsList = localStorage.getItem('product')
        if(productsList){
            const result = JSON.parse(productsList)
            return result
        }else{
            localStorage.setItem('product', JSON.stringify([]))
        }
    },
    // <<<<<<<<<<<<<<<<<<<< Soumission du formulaire >>>>>>>>>>>>>>>>>>>>
    submitForm: () =>{
        const formTag = document.querySelector('.form')
        console.log(formTag)
        if(formTag){
            formTag.addEventListener('submit',e =>{
                e.preventDefault()
                const productsList = productProcedure.initLocalStorage()
                
                nameField = formTag.querySelector('#name')
                quantityField = formTag.querySelector('#quantity')
                priceField = formTag.querySelector('#price')
                const formResult = {
                    id:productsList.length +1,
                    name:nameField.value,
                    quantity:quantityField.value,
                    price:priceField.value,
                    total:quantityField.value * priceField.value,
                }
                console.log(formResult)
                productsList.push(formResult)
                console.log(productsList)
                localStorage.setItem('product',JSON.stringify(productsList))
                productProcedure.displayTable()
                productProcedure.displayTotalSum()
                formTag.reset()
                const modalTag = document.querySelector('.modal__form')
                modalTag.classList.remove('modal__active')
                
            })
        }
    },
    // <<<<<<<<<<<<<<<<<<<<Afficher le tableau>>>>>>>>>>>>>>>>>>>>
    displayTable:() =>{
        const tbodyTag = document.querySelector('#tbody')
        console.log(tbodyTag)
        if(tbodyTag){
            tbodyTag.innerHTML=""
            const getProductsList = productProcedure.initLocalStorage()
            if(getProductsList.length > 0){
                getProductsList.forEach((object,index) =>{
                    const trTag = document.createElement('tr')
                    trTag.classList.add('main__content__bottom__table__line')
                    console.log(trTag)
                    trTag.innerHTML = `
                    <td class="main__content__bottom__table__line__item">${index + 1} </td>
                    <td class="main__content__bottom__table__line__item">${object.name}</td>
                    <td class="main__content__bottom__table__line__item">${object.quantity}</td>
                    <td class="main__content__bottom__table__line__item">${object.price}</td>
                    <td class="main__content__bottom__table__line__item" id="total">${object.total}</td>
                    <td class="main__content__bottom__table__line__item action">
                        <button class="action__details"></button>
                        <div class="action__list">
                            <button class="action__item">Suprimer</button>
                            <button class="action__item">Modifier</button>
                            <button class="action__item">Stock</button>
                            <button class="action__item">Voir plus</button>
                        </div>
                    </td>
                    
                    `     
                    tbodyTag.append(trTag)
                })
            }else{
                const trTag = document.createElement('tr')
                trTag.classList.add('main__content__bottom__table__line')
                console.log(trTag)
                trTag.innerHTML =`<td class="main__content__bottom__table__line__item" colspan="6" style='text-align:center ; padding:15px'> Auncun produit n'a été ajouter</td>`
                tbodyTag.append(trTag)
            }
        }
    },
    // <<<<<<<<<<<<<<<<<<<<Afficher la somme total>>>>>>>>>>>>>>>>>>>>

    displayTotalSum:()=>{
        const totalSumTag = document.querySelector('#total_sum')
        console.log(totalSumTag)
        let sum = 0
        productProcedure.initLocalStorage().forEach((t) =>{
            sum+= t.total
        })  
        totalSumTag.innerHTML = `${sum} fcfa`
    },
// <<<<<<<<<<<<<<<<<<<<Effectuer des actions>>>>>>>>>>>>>>>>>>>>

    otherAction:()=>{
        const actionTag = document.querySelectorAll('.action')
        console.log(actionTag)
        if(actionTag){
            actionTag.forEach((object)=>{
                object.addEventListener('click',e =>{
                    e.preventDefault()
                    const actionListTag = object.querySelector('.action__list')
                    if(actionListTag.classList.contains('active')){
                        actionListTag.classList.remove('active')   
                    }else{
                        actionListTag.classList.add('active')
                    }
                })
            })
           
        }        
    },

    delete:(id)=>{
        const divTag = document.querySelector('#action_container')
        if(divTag){
            divTag.innerHTML = `
            <div class="action__item__content" >
                <p class="form_container_delete_text">Voulez-vous supprimer ce produit?</p>
                <div class="form_container_delete_button">
                    <button id="buttonOne">Oui</button>
                    <button id="buttonTwo">Non</button>
                </div>
            </div>`
            console.log(divTag)
            divTag.classList.add('action_container.active')
            const buttonYesTag= document.querySelector("#buttonOne")
            console.log(buttonYesTag)
            const buttonNoTag= document.querySelector("#buttonTwo")
            console.log(buttonNoTag)
            if(buttonNoTag){
                buttonNoTag.addEventListener('click',e=>{
                    divTag.classList.remove('action_container.active')
                })
            }else{
                const productsList = productProcedure.initLocalStorage()
                const result = productsList.filter(product => product.id !== id)
                localStorage.setItem('product' ,JSON.stringify(result))
                productProcedure.displayTable()
                productProcedure.displayTotalSum()
            }
            
        }
    }


 }
productProcedure.addProduct()
productProcedure.initLocalStorage()
productProcedure.submitForm()
productProcedure.displayTable()
productProcedure.displayTotalSum()
productProcedure.otherAction()
productProcedure.delete()

// <<<<<<<<<<<<<<<<<<<<<<<<<action>>>>>>>>>>>>>>>>>>>>>>>>>>>




 