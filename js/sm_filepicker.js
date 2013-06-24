function openFilePicker()
{
filepicker.setKey('AFCtM6UTMTXmwd62I2MNXz');
    
    var pane = document.getElementById("dragdrop");
    
        filepicker.pickMultiple
        (
            {
                mimetypes: ['image/*', 'text/plain'],
                container: 'modal',
                services:['COMPUTER','DROPBOX','FACEBOOK','GOOGLE_DRIVE','FLICKR','GMAIL','INSTAGRAM','WEBCAM','PICASA'],
            },
            function(fpfiles)
            {

                var ni = document.getElementById('Gallery');
            

                for(var i=0;i<fpfiles.length;i++)
                {                    
                    var liIdName = "my"+[i]+"li";
                    var newli = document.createElement('li');
                    newli.setAttribute("id",liIdName); 
                    newli.innerHTML = "<a target=\"_blank\" onClick=\"window.open(this.href, this.target, 'width=500,height=500'); return false;\" href=\"" + fpfiles[i].url + "\"><img src=\"" + fpfiles[i].url + "\" alt=\"" + fpfiles[i].filename + "\" /></a><a href=\"javascript:;\" onclick=\"removeElement(\'"+liIdName+"\')\">Eliminar <img class=\"delete\" id=\"delete\" src=\"img/delete.png\" alt=\"Eliminar\"/></a>";   
                    ni.appendChild(newli);   
                };
            },
            function(FPError)
            {
                console.log(FPError.toString());
            }
        );  

}

function removeElement(divNum) {
  var d = document.getElementById('Gallery');
  var olddiv = document.getElementById(divNum);
  d.removeChild(olddiv);
}

