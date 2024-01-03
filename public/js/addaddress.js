const country = document.getElementById('country')
const state = document.getElementById('state')

const countrylist ={
    India:[
        'AndhraPradesh',
        'ArunachalPradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'HimachalPradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Maharashtra',
        'MadhyaPradesh',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'TamilNadu',
        'Tripura',
        'Telangana',
        'UttarPradesh',
        'Uttarakhand',
        'WestBengal',
        'Delhi'
    ],
    Pakistan:[]

}

window.onload = function(){
    state.disabled = true

    for(let count in countrylist)
    {   
        country.options[country.options.length] = new Option(count,count)
    }
}

country.onchange = (e)=>{
    state.disabled = false
    for(let states of countrylist[e.target.value])
    {   
        state.options[state.options.length] = new Option(states,states)
    }
    
}