const MultiSelectCSS = `
                .p-multiselect{
                    width: 100%;
                    height: 100%;
                }
                .p-multiselect-label-container{
                    margin-top: 5px;
                }
                .p-multiselect-trigger{
                    color: white;
                }
                .p-multiselect-header .p-checkbox{
                    display: none;
                }
                .p-checkbox .p-highlight{
                    background-color: #3772FF;
                    width: 20px;
                    border-radius : 4px;
                    border: 1px solid #3772FF;
                }
                .p-highlight{
                    background-color: #F5F6FA;
                }
                .p-multiselect-item:hover{
                    background-color: #F5F6FA;
                }
                .p-multiselect-item{
                    padding: 5px;
                }
                .p-checkbox-icon{
                    color: white;
                    width: 13px;
                    margin-left: 1.5px;
                }
                .p-checkbox-box{
                    width: 20px;
                    height: 20px;
                    border: 1px solid #8F8F8F;
                    border-radius: 5px;
                    margin-left: 10px;
                    display: flex;
                }
                
                .p-multiselect-items{
                    margin-top: 15px;
                    margin-bottom: 10px;
                }
                
                .p-multiselect-panel{
                    pisition: relative;
                    background-color: white;
                    z-index: 10;
                    box-shadow: 0 0 8px rgba(0,0,0,0.2);
                    border-radius : 15px;
                    margin-top: 15px;
                }
               
                .p-multiselect-filter-container{
                    margin-bottom : 0px;
                    display: flex;
                    padding: 20px;
                    padding-bottom: 0px;
                }
                .p-multiselect-filter-container input{
                    margin-right: 5px;
                    border: 0.1px solid #F0EFEF;
                    box-shadow: 0 0 5px rgba(0,0,0,0.2);
                    border-radius: 5px;
                    height: 30px;
                }
            
            `
const DropdownCSS = `
                .p-dropdown {
                    width: 100%;
                    height: 100%;
                    padding: 15px;
                }
                .p-dropdown-panel{
                    pisition: relative;
                    background-color: white;
                    z-index: 10;
                    box-shadow: 0 0 8px rgba(0,0,0,0.2);
                    border-radius : 15px;
                    margin-top: 15px;
                }
                .p-dropdown-item{
                    padding: 5px;
                    border-bottom: 1.5px solid #F0EFEF;
                }
                .p-dropdown-item:hover{
                    background-color: #F5F6FA;
                }
                .p-dropdown-items-wrapper{
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
                .p-dropdown-trigger{
                    display: none;
                }
`

const RatingCSS = `
                .p-rating{
                    width: 100%;
                    justify-content : center;
                }
                .p-rating-item {
                    color: #8F8F8F;
                }
                .p-rating-item-active{
                    color: #3772FF;
                }
                .p-rating-cancel-item {
                    display: none;
                }
`
const RadioButtonCSS = `
                .p-radiobutton{
                    border: 1.5px solid #BFBFBF;
                    width: 18px;
                    height: 18px;
                    border-radius: 20px;
                    margin-bottom: 3px;
                    text-align: center;
                }
                .p-radiobutton:hover{
                    border: 1.5px solid #3772FF;
                }
                .p-radiobutton-checked{
                    border: 1.5px solid #3772FF;
                    background-color: #3772FF;
                }
`
const css = MultiSelectCSS+DropdownCSS+RatingCSS+RadioButtonCSS
export default css;