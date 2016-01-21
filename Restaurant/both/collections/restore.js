
Restaurant.Schema.Restore = new SimpleSchema({
    branch:{
        type:String,
        label:"Branch",
        autoform: {
            type: "select2",
            options:function(){
                return Restaurant.List.branchForUser();
            }
        },
        optional:true
    },
    restoreType:{
        type:String,
        label:"Restore Type",
        autoform: {
            type: "select2",
            options:function(){
               return Restaurant.List.backupAndRestoreTypes();
            }
        }
    }
});