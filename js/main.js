$(document).ready(function(){
  $('#content').hide()
  if(localStorage.token){
    $('#landing-page').hide()
    $('#content').show()
    $('#yesno').show()
     $('#logged-name').append(`
        <h6>${localStorage.name}</h6>
      `)
      $('#logged-email').append(`
        <h6>${localStorage.email}</h6>
      `)
  } else {
    $('#landing-page').show()
    $('#content').hide()
  }
  $('#login-form').submit(function(event){
    event.preventDefault()
    let identity = $('#email').val()
    let password = $('#password').val()
    $.ajax({
      method: 'POST',
      url: "http://localhost:3000/users/signin",
      data:{
        identity,password
      }
    })
    .done(response => {
      localStorage.setItem('token', response.token)
      localStorage.setItem('name', response.name)
      localStorage.setItem('email', response.email)
      $('#landing-page').hide()
      $('#content').show();
      $('#logged-name').append(`
        <h6>${localStorage.name}</h6>
      `)
      $('#logged-email').append(`
        <h6>${localStorage.email}</h6>
      `)
      Swal.fire(
        'Logged In',
        `Hello, ${localStorage.name}`,
        'success'
      )
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong Email or password',
      })
    })
  })

  $('#signout').click(function(){
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  })

  $('#register-form').submit(function(event){
    event.preventDefault()
    let name = $('#name').val()
    let email = $('#email-register').val()
    let password = $('#password-register').val()
    let height = $('#height').val()
    let weight = $('#weight').val()
    $.ajax({
      method: 'POST',
      url: "http://localhost:3000/users/signup",
      data:{
        name, email, password, height,weight
      }
    })
    .done(() => {
      $('#landing-page').show()
      $('#content').hide()
      Swal.fire(
        'Registered',
        `Go login and start being fit!`,
        'success'
      )
    })
  })

  $('#yesnobtn').click(function(){
    yesno()
  })

})

function yesno(){
  $.ajax({
    method: 'GET',
    url: "http://localhost:3000/users/decision"
  })
  .done(data => {
    console.log(data)
    if(data.result.message == 'yes'){
      Swal.fire({
        title: `${data.result.answer}!`,
        text: 'Stop Eating fatty!!!',
        imageUrl:  `${data.result.image}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    } else {
      Swal.fire({
        title: `${data.result.answer}!`,
        text: 'You deserve that food',
        imageUrl:  `${data.result.image}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }
  })
}


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  $('#landing-page').hide()
  $('#content').show()
  $('#logged-name').empty().append(`
    <h6>${localStorage.name}</h6>
  `)
  $('#logged-email').empty().append(`
    <h6>${localStorage.email}</h6>
  `)
}

