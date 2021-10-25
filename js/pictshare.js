Dropzone.autoDiscover = false;

$(function() {
    var myDropzone = new Dropzone("#dropzone");
    myDropzone.on("success", function(file,response) {
        console.log("raw response: "+response);
        if(response==null || response =="null")
            $("#uploadinfo").append("<div class='alert alert-danger' role='alert'><strong>Error uploading "+file.name+"</strong><br/>Reason is unknown :(</div>")
        else
        {
            var o = JSON.parse(response);
            if(o.status=='ok')
                $("#uploadinfo").append("<div class='alert alert-success' role='alert'><strong>"+file.name+"</strong> uploaded as <a target='_blank' href='/"+o.hash+"'>"+o.hash+"</a><br/>URL: <button class="clipboard">Copy Url</button> <a target='_blank' href='"+o.url+"'>"+o.url+"</a></div>")
            else if(o.status=='err')
                $("#uploadinfo").append("<div class='alert alert-danger' role='alert'><strong>Error uploading "+file.name+"</strong><br/>Reason: "+o.reason+"</div>")
            console.log(o)
        }
    });

    document.onpaste = function(event){
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (index in items) {
          var item = items[index];
          if (item.kind === 'file') {
            // adds the file to your dropzone instance
            myDropzone.addFile(item.getAsFile())
          }
        }
      }
  })
$(function copyToClipboard(text) {
var inputc = document.body.appendChild(document.createElement("input"));
inputc.value = window.location.href;
inputc.focus();
inputc.select();
document.execCommand('copy');
inputc.parentNode.removeChild(inputc);
alert("URL Copied.");
}
