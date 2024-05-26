import searchBarModel from '../../models/searchBar/searchBarModel2.js';

const searchBarController = async (req, res, next) => {
    try {
        
        const search = await searchBarModel()

        res.send({
             
                search,
            
         
        });
    } catch (err) {
        next(err);
    }
};

export { searchBarController };
