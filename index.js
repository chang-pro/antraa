const Api = (() => {
    const baseUrl = 'http://localhost:4232';
    const courseList = 'courseList';
  
    const getCourse = () =>
      fetch([baseUrl, courseList].join('/')).then((response) => response.json());
  
    return {
      getCourse
      
    };
  })();

  const View = (() => {
    const domstr = {
        allcoursescontainer: '#all-courses'
      };
    
    const render = (ele,tmp) => {
      ele.innerHTML =`<li>Avalible Courses<li>`+ tmp;
    };
    const createTmp = (arr) => {
        let tmp = '';
        arr.forEach((courses) => {
          tmp += `
            <li >
              <button class="course" id="${courses.courseId}">${courses.courseName} 
                <span >Class type-${courses.required} </span>
                <span >Classc credet ${courses.credit}</span>
              </button>
            </li>
          `;
        });
        return tmp;
      }
        return {
            domstr,
            render,
            createTmp,
        };
  })();
  
 //-----------------------------------------------------------------------


 const Model = ((api, view) => {
    class Courses {
        constructor(courseId, courseName, credit) {
          this.userId = courseId;
          this.courseName = courseName;
          this.credit = credit;
        }
      }
      class State {
        #courselist = [];
    
        get courselist() {
          return this.#courselist;
        }
        set courselist(newcourselist) {
          this.#courselist = [...newcourselist];
    
          const allcoursescontainer = document.querySelector(view.domstr.allcoursescontainer);
          const tmp = view.createTmp(this.#courselist);
          view.render(allcoursescontainer, tmp);
        }
      }
    const {getCourse} = api
    return{
        getCourse,
        Courses,
        State,
    }
    
    })(Api, View)


//-----------------------------------------------------------------------

const controller = ((model, view) => {
    const state = new model.State();

    const selectedCourse = () => {
        const allcoursescontainer = document.querySelector(view.domstr.allcoursescontainer);
        allcoursescontainer.addEventListener('click', (e) => {
        if (e.target.className === 'course') {
            console.log(e.target.id)
        }
      
      });
      };
    const init = () => {
        model.getCourse().then((courses) => {
          state.courselist = [...courses];
        });
      };
    return{
        init,
        selectedCourse
        }
})(Model, View)
controller.init()