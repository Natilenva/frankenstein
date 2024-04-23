import insertProjectModel from "../../models/entries/insertProjectModel.js";
const newProjectController = async (req, res, next) => {
  
    try {
        const {project_title, project_description}=req.body;
        
        if(!project_title||!project_description){
            console.error('faltan campos');
        }
        const projectId = await insertProjectModel(
            project_title,
            project_description,
            req.user.id,
        );
        res.status(201).send({
            status:'ok',
            message:'proyecto creado',
            data:{
                project:{
                    id: projectId,
                    project_title,
                    project_description,
                    userId: req.user.id,
                    //createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default newProjectController;