
const userSave = {
    initLocalStorage :()=>{
        const userList = localStorage.getItem('user')
        if(userList){
            const result = JSON.parse(userList)
            return result
        }else{
            localStorage.setItem('user',JSON.stringify([]))
        }
    },


    submitForm : () =>{
        const formTag = document.querySelector('.form')
        console.log(formTag)
        if(formTag){
            formTag.addEventListener('submit',e =>{
                const userList = userSave.initLocalStorage()
                e.preventDefault()
                const nameField = formTag.querySelector('#firstname')
                const lastNameField = formTag.querySelector('#lastname')
                const passWordField = formTag.querySelector('#password')
                
                const userInformation = {
                    id:userList.length + 1,
                    name:nameField.value,
                    lastName:lastNameField.value,
                    passWord:passWordField.value,
                }
                console.log(userInformation)
                userList.push(userInformation)
                console.log(userList)
                localStorage.setItem('user',JSON.stringify(userList))
                const url = 'admin.html'
                window.location.href = url
                formTag.reset()
            })
        }
    }
}
userSave.initLocalStorage()
userSave.submitForm()