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
                $("#uploadinfo").append("<div class='alert alert-success' role='alert'><strong>"+file.name+"</strong> uploaded as <a target='_blank' href='/"+o.hash+"'>"+o.hash+"</a><br/>URL: <a target='_blank' href='"+o.url+"'>"+o.url+"</a></div>")
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
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
