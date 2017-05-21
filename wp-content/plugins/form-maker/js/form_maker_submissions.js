function tableOrdering(order, dir, task) {
  var form = document.admin_form;
  form.filter_order2.value = order;
  form.filter_order_Dir2.value = dir;
  submitform(task);
}

function ordering(name, as_or_desc) {
  document.getElementById('asc_or_desc').value = as_or_desc;
  document.getElementById('order_by').value = name;
  document.getElementById('admin_form').submit();
}

function renderColumns() {
  allTags = document.getElementsByTagName('*');
  for (curTag in allTags) {
    if (typeof(allTags[curTag].className) != "undefined") {
      if (allTags[curTag].className.indexOf('_fc') > 0) {
        curLabel = allTags[curTag].className.replace('_fc', '');
        curLabel = curLabel.replace('table_large_col ', '');
        if (document.forms.admin_form.hide_label_list.value.indexOf('@' + curLabel + '@') >= 0) {
          allTags[curTag].style.display = 'none';
        }
        else {
          allTags[curTag].style.display = '';
        }
      }
    }
    if (typeof(allTags[curTag].id) != "undefined") {
      if (allTags[curTag].id.indexOf('_fc') > 0) {
        curLabel = allTags[curTag].id.replace('_fc','');
        if (document.forms.admin_form.hide_label_list.value.indexOf('@' + curLabel + '@') >= 0) {
          allTags[curTag].style.display = 'none';
        }
        else {
          allTags[curTag].style.display = '';
        }
      }
    }
  }
}

function clickLabChB(label, ChB) { 
  document.forms.admin_form.hide_label_list.value = document.forms.admin_form.hide_label_list.value.replace('@' + label + '@', '');
  if (document.forms.admin_form.hide_label_list.value == '') {
    document.getElementById('ChBAll').checked = true;
  }
  if (!(ChB.checked)) {
    document.forms.admin_form.hide_label_list.value += '@' + label + '@';
    document.getElementById('ChBAll').checked = false;
  }
  renderColumns();
}

function toggleChBDiv(flag) { 
  if (flag) {
    /* sizes = window.getSize().size;*/
    var width = jQuery(window).width();
    var height = jQuery(window).height();
    document.getElementById("sbox-overlay").style.width = width + "px";
    document.getElementById("sbox-overlay").style.height = height + "px";
    document.getElementById("ChBDiv").style.left = Math.floor((width - 350) / 2) + "px";

    document.getElementById("ChBDiv").style.display = "block";
    document.getElementById("sbox-overlay").style.display = "block";
  }
  else {
    document.getElementById("ChBDiv").style.display = "none";
    document.getElementById("sbox-overlay").style.display = "none";
  }
}

function submit_del(href_in) {
  document.getElementById('admin_form').action = href_in;
  document.getElementById('admin_form').submit();
}

function submitbutton(pressbutton) {
  var form = document.adminForm;
  if (pressbutton == 'cancel_theme') {
    submitform(pressbutton);
    return;
  }
  if (document.getElementById('title').value == '') {
    alert('The theme must have a title.')
    return;
  }
  submitform(pressbutton);
}

function submitform(pressbutton) {
  document.getElementById('adminForm').action = document.getElementById('adminForm').action + "&task=" + pressbutton;
  document.getElementById('adminForm').submit();
}

function edit_star_rating(id, a) {
  rated = true;
  star_amount = document.getElementById(a + '_star_amountform_id_temp').value;
  for (var j = 0; j <= id; j++) {
    document.getElementById(a + '_star_' + j).src = plugin_url + '/images/star_yellow.png';
  }
  for (var k = id + 1; k <= star_amount - 1; k++) {
    document.getElementById(a + '_star_' + k).src = plugin_url + '/images/star.png';
  }
  star_amount = id + 1;
  document.getElementById(a + '_selected_star_amountform_id_temp').value = star_amount;
  document.getElementById('submission_' + a).value = star_amount + '/' + document.getElementById(a + '_star_colorform_id_temp').value;
}

function edit_scale_rating(checked_value, a) {
  if (!checked_value) {
    var checked_radio_value = 0;
  }
  scale_amount = document.getElementById(a + '_scale_checkedform_id_temp').value;
  document.getElementById('submission_' + a).value = checked_value + '/' + scale_amount;
}

function edit_grading(num, items_count) {
  var sum = 0;
  var elements_to_add = "";
  for (var k = 0; k < 100; k++) {
    if (document.getElementById(num + '_element' + k)) {
      if (document.getElementById(num + '_element' + k).value) {
        sum = sum + parseInt(document.getElementById(num + '_element' + k).value);
      }
    }
    if (sum > document.getElementById(num + '_grading_totalform_id_temp').innerHTML) {
      document.getElementById(num + '_text_elementform_id_temp').innerHTML = " Your score should be less than " + document.getElementById(num + '_grading_totalform_id_temp').innerHTML;
    }
  }
  document.getElementById(num + '_grading_sumform_id_temp').innerHTML = sum;
  element = document.getElementById(num + '_element_valueform_id_temp').value;
  element = element.split(':');
  for (var k = 0; k < (element.length - 1) / 2; k++) {
    if (document.getElementById(num + '_element' + k).value) {
      elements_to_add += document.getElementById(num + '_element' + k).value + ":";
    }
    else {
      elements_to_add += ":";
    }
  }
  element = element.slice((element.length - 1) / 2);
  element = element.join(':');
  grading = elements_to_add + element;
  document.getElementById(num + '_element_valueform_id_temp').value = grading;
  document.getElementById('submission_' + num).value = grading + "***grading***";
}

function edit_range(value, id, num) {
  document.getElementById(id + '_element' + num).value = value;
  document.getElementById('submission_' + id).value = document.getElementById(id + '_element0').value + "-" + document.getElementById(id + '_element1').value;
}

function change_radio_values(a, id, rows_count, columns_count) {
  var annnn = "";
  var not_found = true;
  for (var j = 1; j <= rows_count; j++) {
    for (var k = 1; k <= columns_count; k++) {
      if (document.getElementById(id + '_input_elementform_id_temp' + j + '_' + k).checked == true) {
        annnn += j + '_' + k + '***';
        not_found = false;
        break;
      }
    }
    if (not_found == true) {
      annnn += '0' + '***';
    }
    not_found = true;
  }
  var element = document.getElementById(id + '_matrixform_id_temp').value;
  element = element.split('***');
  element = element.slice(0, -(rows_count + 1));
  element = element.join('***');
  element += '***' + annnn;
  document.getElementById('submission_' + id).value = element + '***matrix***';
  document.getElementById(id + '_matrixform_id_temp').value = element;
}
