export const getComponentPermissions = (permissions, targetName) => {
  if (!permissions) return [];

  for (const perm of permissions) {
    if (perm.name === targetName) {
      // Nếu có childPermissions → trả về danh sách tên
      return perm.childPermissions?.map(p => p.name) || [];
    }
    if (perm.childPermissions?.length > 0) {
      const foundInChild = getComponentPermissions(perm.childPermissions, targetName);
      if (foundInChild.length > 0) return foundInChild;
    }
  }

  return [];
};

export const canViewComponent = (permissions, componentName) => {
  // Nếu component có child permissions → check "VIEW"
  const childPerms = getComponentPermissions(permissions, componentName);
  if (childPerms.length === 0 && permissions.some(p => p.name === componentName)) {
    // ví dụ DASHBOARD → chỉ cần có tên là có quyền
    return true;
  }
  return childPerms.includes("VIEW");
};
