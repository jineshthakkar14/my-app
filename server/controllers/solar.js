
const Solar = require("../models/Solar");

exports.solar = async (req, res,next) => {
    

      try {

        const x = req.cookies.raju;

        console.log(x)

      if (x!==undefined) {
          return res.status(403).send({
            success: false,
            message: "ALready Logged In",
          })
        }
        const user = await Solar.create({
            positionX:null,
            positionY:null,
            link:[]
        })

        // const raju = await Solar.findByIdAndUpdate({id:user._id},{
        //     positionX:PositionX,
        //     positionY:PositionY,
        // })

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          }

        res.cookie("raju",user,options).status(200).json({
        success: true,
        user,
        options,
        message: `User Login Success`,
        })

        

        //   return res.status(200).json({
        //     success: true,
        //     user,
        //     message: "User registered successfully",
        //   })

          next()

      } catch (error) {
            console.error(error)
            console.log(error)
            return res.status(500).json({
            success: false,

            message: "User cannot be registered. Please try again.",
            })
         }

}

exports.solar1 = async (req, res) => {
    try {
        const {PositionX,PositionY,links} = req.body;

        const x = req.cookies.raju._id       

    // if (
    //    !PositionX||!PositionY
    //   ) {
    //     return res.status(403).send({
    //       success: false,
    //       message: "All Fields are required",
    //     })
    //   }

      const ans = await Solar.findByIdAndUpdate(x,{positionX:PositionX,positionY:PositionY,links:links},{new:true})
  

      return res.status(200).json({
        success: true,
        ans,
        message: "User registered successfully",
      })

    } catch (error) {
        console.error(error)
            console.log(error)
            return res.status(500).json({
            success: false,

            message: "User cannot be registered. Please try again.",
            })
    }
}

exports.getAll = async (req, res) => {
    try {

        const x = req.cookies.raju._id

        if(!x){
          return res.status(403).send({
              success: false,
              message: "Key not found",
            })
        }



      const ans = await Solar.findById(x)

      return res.status(200).json({
        success: true,
        ans,
        message: "User registered successfully",
      })

    } catch (error) {
        console.error(error)
            console.log(error)
            return res.status(500).json({
            success: false,

            message: "User cannot be registered. Please try again.",
            })
    }
}