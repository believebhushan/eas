
const { createClient } =require('@supabase/supabase-js')

const Client=()=>{
    const supabaseUrl = 'https://zygwhcisypkttpmmafxk.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z3doY2lzeXBrdHRwbW1hZnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEyMDkwMjgsImV4cCI6MTk4Njc4NTAyOH0.mvoM1ZbTQ-xp74Z5bnC-tAuZ2V-IRBk4_ZEcJyQB_C8'
    const supabase = createClient(supabaseUrl, supabaseKey)
    const getDataFrom=async ({relationName,columnToFetch=''})=>{
        const response={data:{},error:{}}
        try {
            const res= await supabase.from(relationName).select()
         
                // response.data=res
                // response.error=res.error
                return res?.data
            
        } catch (error) {
            response.is_successful=false
            response.error=error
            return response
        }
    }

    const findById= async({relationName,id})=>{
        const response={data:{},error:{}}
        try {
            const res= await supabase.from(relationName).select().eq("id",id)

            response.data=res.data
            response.error=res.error
            
        } catch (error) {
            console.log(error)
            response.is_successful=false
            response.error=error
        }
    }

    return {
        client:supabase,
        getDataFrom,
        findById
    }
    
}

module.exports=Client