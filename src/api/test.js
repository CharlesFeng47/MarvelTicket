import $ from 'jquery'

export function test_link(params) {
  $.ajax({
    url: 'http://localhost:3000/TicketsManagementSystem/user/login',
    crossDomain: true,
    type: 'post',
    xhrFields: {
      withCredentials: true
    },
    data: {
      username: '0000001',
      password: 'qwertyuiop',
      userType: 'spot'
      // paramName: 'aaa'
    },
    // dataType: 'text/plain; charset=utf-8',
    success: function(data, textStatus, jqXHR) {
      alert('succ' + data)
      console.log(data)
      return data
    },
    error: function() {
      alert('fail')
    }
  })
  alert('finish')
}
