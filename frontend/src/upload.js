import axios from "axios";

function Upload(){

    const uploadFile = async(e)=>{

        const formData = new FormData();

        formData.append(
            "logfile",
            e.target.files[0]
        );

        try{

            await axios.post(
                "http://localhost/mini_splunk/backend/upload.php",
                formData
            );

            alert("File Uploaded");

            window.location.reload();

        }catch(error){

            console.log(error);

            alert("Upload Failed");

        }
    };

    return(

        <div>

            <input
                type="file"
                onChange={uploadFile}
            />

        </div>
    );
}

export default Upload;