const { createClient } =require('@supabase/supabase-js')

const supabaseUrl = 'https://zygwhcisypkttpmmafxk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z3doY2lzeXBrdHRwbW1hZnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEyMDkwMjgsImV4cCI6MTk4Njc4NTAyOH0.mvoM1ZbTQ-xp74Z5bnC-tAuZ2V-IRBk4_ZEcJyQB_C8'
const supabase = createClient(supabaseUrl, supabaseKey)

const fetchData= async ()=>{
//     const { error:insertesc } = await supabase
//   .from('users')
//   .insert({ name: "Bharat", email_id: 'some@hjh.dbhb',phone_number:"56565656",status:"deleted",is_active:false })
    const { data, error } = await supabase
  .from('employees')
  .select()

  
  console.log(data,error)

}


 fetchData()