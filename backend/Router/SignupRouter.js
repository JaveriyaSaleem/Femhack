import express from "express"
import signupModal from '../Models/SignupModal.js'
const router = express.Router()




// define the home page route
router.get('/', async(req, res) => {

  try{
    const users = await signupModal.find(); 
    res.json(users); // sending all products as JSON
  }catch(e){
    res.status(500).json({ message: e.message });
  }
})
// define the about route
router.post('/', async (req, res) => {
  try{
    const existingUser = await signupModal.findOne({ email: req.body.email });
    if (existingUser) {
        // If the user already exists, send a response and do not create the user
        return res.status(400).json({ message: "User already exists. Please log in." });
      }
    let a = await signupModal.create({
      userName: req.body.username,
      email: req.body.email,
      password:req.body.password
      
    })
// res.send("post req")
    res.send(a)
    console.log(req.body)
  }catch(e){
    console.log(e)
  }

})
router.delete('/:id', async(req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedProduct = await product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
res.send("delete req")
  })

  router.put('/', (req, res) => {
    res.send('updated')
  })

export default router