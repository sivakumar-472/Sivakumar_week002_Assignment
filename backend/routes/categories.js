const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


//Get All Categories

router.get('/',async(req,res)=>{
    try {
        const Categories = await Category.find();
        res.json(Categories)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

//Get a single category by ID

router.get('/:id',async(req,res)=>{
    try{
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({message:"Category not Found"})
        }
        res.json(category);
    }
    catch(error){
        res.status(500).json({message:error.message})

    }
})


//create a new category

router.post('/',async(req,res)=>{
    const category = new Category({
        name:req.body.name,
        slug:req.body.slug,
        description:req.body.description,
        
        

    });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
        
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
})


//update a existing post

// router.put('/:id',async(req,res)=>{
//     try {
//         const category = await Category.findById(req.params.id);
//         if(!post){
//             return res.status(404).json({message:"Category not Found"})
//         }
//         category.name = req.body.name || category.name;
//         category.slug = req.body.slug || category.slug;
//         category.description = req.body,description|| category.description;
//         post.updatedAt = Date.now();

//         const updatedCategory = await category.save();
//         res.json(updatedCategory);

        
//     } catch (error) {
//         res.status(400).json({message:error.message});
        
//     }

// })


// Update an existing category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not Found" });
        }

        category.name = req.body.name || category.name;
        category.slug = req.body.slug || category.slug;
        category.description = req.body.description || category.description;
        category.updatedAt = Date.now();  // Assuming your model has this field

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//Delete a category

// router.delete('/:id', async(req,res)=>{
//     try {
//         const category = await Category.findById(req.params.id);
//         if(!post){
//             return res.status(404).json({message:"Category not Found"})
//         }
//        // await Post.deleteOne({_id:post._id})
//       await Category.findByIdAndDelete(category._id);
//        res.json({message:"Post Deleted"});
        
//     } catch (error) {
//         res.status(500).json({message:error.message})
        
//     }
// })


// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not Found" });
        }
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
