export const byName = (name = '') => {
  if (!name) return () => true;

  return (teamMember) => {
    const reg = new RegExp(name, 'i');
    const { first, last } = teamMember.name;

    return reg.test(`${first} ${last}`);
  };
};

export const byGender = (genders = []) => {
  if (!genders.length) return () => true;

  return (teamMember) => {
    return genders.includes(teamMember.gender);
  };
};

export const byDepartments = (departments = []) => {
  if (!departments.length) return () => true;

  return (teamMember) => {
    return departments.includes(teamMember.department);
  };
};

export const byYearsAtCompany = (time = 0) => {
  if (!time) return () => true;

  return (teamMember) => {
    return time <= teamMember.yearsAtCompany;
  };
};
