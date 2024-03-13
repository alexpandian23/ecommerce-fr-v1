// import React, { useState } from 'react'

// export const Addproduct = () => {
//     const [selectedImage, setSelectedImage] = useState(null);

//     const handleFile = () => {
//       console.log("hello world")
//       const formData = new FormData();
//       formData.append("file", selectedImage);
  
//       fetch("http://localhost:8080/file/upload", {
//           method: 'POST',
//           body: formData,
//           dataType: "jsonp"
//       })
//       .then(response => response.text())
//       .then(text => {
//           console.log(text)
//       })
//     }
  
//     return (
//       <div>
  
//         {selectedImage && (
//           <div>
//             <img
//               alt="not found"
//               width={"250px"}
//               src={URL.createObjectURL(selectedImage)}
//             />
//             <br />
//             <button onClick={() => setSelectedImage(null)}>Remove</button>
//             <button onClick={ ()=>handleFile()}>Upload</button>
//           </div>
//         )}
//         <br />
//         <br />
        
//         <input
//           type="file"
//           name="myImage"
//           onChange={(event) => {
//             console.log(event.target.files[0]);
//             setSelectedImage(event.target.files[0]);
//           }}
//         />
//       </div>
//     );
//   }
import React, { useState } from 'react'


export const Addproduct = () => {
    
    //image upload
    const [selectedImage, setSelectedImage] = useState(null);
    let uploadedImage=null

    const handleFile = () => {
        console.log("hello world")
        const formData = new FormData();
        formData.append("file", selectedImage);
        fetch("http://localhost:8080/file/upload", {
            method: 'POST',
            body: formData,
            dataType: "jsonp"
        })
            .then(response => response.text())
            .then(text => {
                uploadedImage=text
                console.log(text)
                alert("imageuploded")
            })
    }


    //add detils
    const [file, setFile] = useState({
        productName: "",
        description: "",
        price:"",
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFile({ ...file, [name]: value })
        console.log(name, value);
    }
    const handleSubmit = (event) => {

      event.preventDefault();
    }
      

    const Addfiles = () =>{
        const files = {
            productName: file.productName,
            description: file.description,
            price:file.price,
            image:uploadedImage,
            
        }
        console.log("===Files====", JSON.stringify(files));
        fetch("http://localhost:8080/file/addfile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(files)
        })
        .then(response => {
            if (response.ok) {
                return(
                     response.json()      
                );   
            } else {
                throw new Error(`Server returned status: ${response.status}`);
            }
        })
    }

    return (
        <div>
          
            {selectedImage && (
                <div>
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>RemoveImage</button>
                    <button onClick={() => { handleFile() }}>UploadImage</button>
                </div>
            )}
         
           
           <center>
            
                <form onSubmit={handleSubmit} className='bg-info'>
                    <input type="text" name='productName' value={file.productName} onChange={handleChange} placeholder='enter a product name' />
                    <input type="text" name='description' value={file.description} onChange={handleChange} placeholder='enter a description' />
                    <input type="text" name='price' value={file.price} onChange={handleChange} placeholder='enter a price' />
                    <label htmlFor="catagorie">Choose a catagorie:</label>

<select id="catagorie">
  <option value="men">Men</option>
  <option value="women">Women</option>
  <option value="kids">Kids</option>
  
</select>
                    <input type="file" name="image"  onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }} /><br /><br />
                                        <button onClick={() => {Addfiles()}}>Add</button>
                  
                </form>
           </center>
        </div>
    )
}






