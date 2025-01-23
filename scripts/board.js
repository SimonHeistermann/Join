function openNav() {
  document.getElementById("popup").style.display = "block";
  console.log("Hello World");
}

function closeNav() {
  document.getElementById("popup").style.display = "none";
}

function addTask() {
  let createPopup = document.getElementById("overay_Template");

  createPopup.innerHTML = `<div class="all__testt"> 
  
  <section>
            <!-- section add task popup-->

            <div class="add__task__main" id="popup">
              <div class="close__btn">
                <h1>Add Task</h1>
                <img
                  onclick="closeNav()"
                  src="assets/icons/cancel_icon_blue.png"
                  alt=""
                  width="18"
                />
              </div>

              <form class="inputfields">
                <div class="left_side">
                  <lable class="label" for="title"
                    >Title
                    <div class="star">*</div></lable
                  >
                  <input
                    type="text"
                    class="text_input"
                    id="text__input"
                    name="title"
                    placeholder="Enter a title"
                    required
                  />
                  <label class="label" for="description">Description</label>
                  <textarea
                    class="description"
                    name="description"
                    id="description"
                    placeholder="Enter a Description"
                  ></textarea>
                  <label class="label" for="assigned_to">Assigned to</label>
                  <select
                    class="assigned_to"
                    name="assigned_to"
                    id="assigned__to"
                  ></select>
                </div>
                <div class="the_divider"></div>
                <div class="right_side">
                  <label class="label" for="date"
                    >Due date
                    <div class="star">*</div></label
                  >
                  <input
                    type="date"
                    class="date"
                    id="date__input"
                    name="date"
                    placeholder="dd/mm/yyyy"
                    required
                  />
                  <label class="label" for="prio">Prio</label>
                  <div class="radio_overall">
                    <label class="radio radio_urgend">
                      <input type="radio" name="prio" value="1" onclick="" />
                      Urgent
                      <img src="assets/icons/Property 1=Urgent.png" alt="↑" />
                    </label>
                    <label class="radio radio_medium">
                      <input
                        type="radio"
                        name="prio"
                        value="2"
                        checked
                        onclick=""
                      />
                      Medium
                      <img src="assets/icons/Property 1=Medium.png" alt="=" />
                    </label>
                    <label class="radio radio_low">
                      <input type="radio" name="prio" value="3" onclick="" />
                      Low <img src="assets/icons/Property 1=Low.png" alt="↓" />
                    </label>
                  </div>
                  <label class="label" for="category"
                    >Category
                    <div class="star">*</div></label
                  >
                  <select
                    type="select"
                    name="category"
                    class="category"
                    required
                  >
                    <option value="">Select task category</option>
                    <option value="tt">Technikal Task</option>
                    <option value="us">User Story</option>
                  </select>
                  <label for="subtask">Subtask</label>
                  <input
                    type="text"
                    name="subtask"
                    id="subtask"
                    class="subtask"
                    placeholder="Add new subtask"
                  />
                  <div class="table_subtask" id="subtask_table"></div>
                </div>
              </form>
              <div class="text_and_buttons">
                <div class="is_required">
                  <div class="star">*</div>
                  This field is required
                </div>
                <div class="task_butons">
                  <button class="secondary_button clear" onclick="">
                    Clear <img src="assets/icons/cancel_icon_blue.png" alt="" />
                  </button>
                  <button class="button1 create_task" disabled onclick="">
                    Create Task <img src="assets/icons/check.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </section>
  
  </div>`;
}
