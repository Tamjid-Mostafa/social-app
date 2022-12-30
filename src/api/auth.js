export const setAuthToken = user => {
    const currentUser = {
        email: user.email,
    }
    fetch(`https://social-app-server-tamjid-mostafa.vercel.app/user/${user?.email}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          //Save token in LocalStorage
          localStorage.setItem('social-app token', data.token)
        })

}