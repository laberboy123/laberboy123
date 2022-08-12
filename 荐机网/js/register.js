
function isEmail(strEmail) {
	if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
	return true;
	else
	alert("邮箱格式錯誤");
	}
    function check2pwd(){
      if(password1.value != password.value) {  
          alert("两次输入密码不一致！")
          password1.value = "";  
          password.value = "";  
        }
    }
function checkname(){
  if(username.value==''){
    alert('用户名不能为空！');
  }
}

function checkpwd(){
    if(password.value==''){
      alert('密码不能为空！');
      }
      if(password.value.length<6){
      alert('密码至少为6位，请重新输入！');
      }
  }