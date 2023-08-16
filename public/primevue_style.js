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
                    width: 17.5px;
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
                .p-checkbox{
                    width: 22px;
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
                    border: 0.2px solid #8F8F8F;
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
                    min-width: 110px;
                    width: 100%;
                    justify-content : center;
                }
                .p-rating-item-active{
                    color: #3772FF;
                }
`
const css = MultiSelectCSS+DropdownCSS+RatingCSS
export default css;