

class ReqestManager {
  static async handlerSubmit(route, body) {
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });    
    const data = await response.json();
    return data;
  }

  static async handlerRole(role) {
    const response = await fetch('students/add', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }

  static async delete(route) {
    const response = await fetch(route, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    window.location.reload(true); 
    const data = await response.json();
    return data;
  }
}

window.onload = () => {
  const form = document.getElementById('form-st');
  const selectRoleStudent = document.getElementById('rol');
  const atrDisable = document.querySelectorAll('.disabled');
  const artMult = document.querySelector('.multiple');

  if (form && selectRoleStudent && atrDisable.length > 0 && artMult) {
    selectRoleStudent.addEventListener('change', (e) => {
      const role = e.target.value;
      ReqestManager.handlerRole(role);

      if (role === 'lect') {
        form.classList.add('active');
        atrDisable.forEach((attr) => {
          attr.removeAttribute('disabled');
        });
        artMult.removeAttribute('multiple');
      } else {
        form.classList.remove('active');
        atrDisable.forEach((attr) => {
          attr.setAttribute('disabled', 'true');
        });
        artMult.setAttribute('multiple', 'true');
      }
    });
  }

  const deleteButtons = document.querySelectorAll('.delete-btn');  
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const route = e.target.dataset.id;         
      await ReqestManager.delete(route);
    });
  });

};
