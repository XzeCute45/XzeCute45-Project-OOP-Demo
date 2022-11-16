// ไฟล์นี้เป็นการวน folder img เพื่อนำข้อมูลมาสร้าง directory tree
// **path คือ ที่อยู่ของ file หรือ directory **
const fs = require('fs');   //require ('fs') คือ การ require หรือการร้องขอไฟล์      const คือ ตัวแปรที่ไม่ต้องการเปลี่ยนแปลงค่าได้
lnamefile = '.dcm';     //นามสกุลของรูป       โดย lnamefile = lastnamefile
folderPath = '../img';  //folder ที่เก็บรูป folder ตั้งต้น
var make=(path)=>{
    console.log(fs.readdirSync(path));  //คำสั่ง fs.readdirSync เป็นการอ่านเนื้อหา directory แบบ synchronously ซึ่ง Method จะส่งคืนค่าอาร์เรย์ที่มีชื่อไฟล์หรืออ็อบเจ็กต์ทั้งหมดในไดเร็กทอรี
    const list = [];
    fs.readdirSync(path).forEach(file=>{    //การอ่าน forEach คือการอ่านวนลูปใน array จนครบ
        const key = `${path}/${file}`;  //เก็บ path ไฟล์ที่ read มาได้ เพื่อที่จะใช้ในการหา path เวลาคลิกรูป ex. path/img
        
        console.log(key);
        const treeNode = {
            title: file,    //ชื่อไฟล์รูป *.dcm ทั้งหมดที่อยู่ใน img
            key:key,    //path ของรูป
        };

        console.log(key);
        if(!file.includes(lnamefile)){  //ตรวจสอบว่าถ้าไม่มี .dcm โดยจะเข้าไฟล์แต่ละไฟล์ไปเรื่อยๆ
            treeNode.children = make(`${path}/${file}`);    //นำมาแตกเป็น children แล้วเรียกใช้ make เพื่อสร้าง
        }else{
            treeNode.value = `${path}/${file}`; //เป็น leafnode แล้ว(*.dcm)
        }
        
        list.push(treeNode); 
    })
    return list;
    
}
const arr = make(folderPath);
console.log(arr);
let data = JSON.stringify(arr, null, 2);    //arr = data, null = ตัวแทนค่าว่าง, 2 = ช่องว่าง
fs.writeFileSync('Datalist.json', data, (arr) =>{  
    if(err){throw err;} //ถ้า error โดยคำสั่ง throw คือ เราทำให้เกิดความผิดพลาด โปรแกรมจะหยุดทำงานทันที
    console.log('Data written to file')
});

