---
title: Verify
---
<div class="row">
  <div class="col-lg-3">
  </div>
  <div class="col-lg-6">
    <h2 class="center">Verifying Email...</h2>
  </div>
</div>

<script>
 var info = document.getElementById('info');
 function getUrlParams() {
   var p = {};
   var match,
       pl     = /\+/g,  // Regex for replacing addition symbol with a space
       search = /([^&=]+)=?([^&]*)/g,
       decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
       query  = window.location.search.substring(1);

   while (match = search.exec(query))
     p[decode(match[1])] = decode(match[2]);
   return p;
 }
 function init() {
   var urlParams = getUrlParams();
   if (!('email' in urlParams) || !('verify' in urlParams)) {
     info.innerHTML = 'Please specify email and verify token in the URL.';
   } else {
     var input = {
       email: urlParams['email'],
       verify: urlParams['verify']
     };
     lambda.invoke({
       FunctionName: 'LambdAuthVerifyUser',
       Payload: JSON.stringify(input)
     }, function(err, data) {
       if (err) console.log(err, err.stack);
       else {
         var output = JSON.parse(data.Payload);
         if (output.verified) {
           info.innerHTML = 'User ' + input.email + ' has been <b>Verified</b>, thanks!'
         } else {
           info.innerHTML = 'User ' + input.email + ' has <b>not</b> been Verified, sorry.'
         }
       }
     });
   }
 }
 window.onload = init();
</script>
