# 🛠️ Scripts Directory

This directory contains utility scripts to simplify development and maintenance of the KTU AI Assistant.

## 📋 Available Scripts

### 🚀 **Essential Scripts**

#### `setup.bat` - **Complete Initial Setup**
- 🔧 Creates Python virtual environment
- 📦 Installs all backend dependencies
- 🎨 Installs all frontend dependencies
- ✅ Verifies environment setup

**Usage:**
```bash
scripts\setup.bat
```

#### `start_servers.bat` - **Launch Application**
- 🔧 Starts FastAPI backend server
- 🎨 Starts React development server
- 🌐 Opens both in separate windows
- 📱 Shows access URLs

**Usage:**
```bash
scripts\start_servers.bat
```

### 🔧 **Utility Scripts**

#### `health_check.bat` - **System Status Monitor**
- ✅ Checks if backend is running
- ✅ Checks if frontend is running
- ✅ Verifies dependencies are installed
- ✅ Tests Ollama connectivity
- 📊 Provides health summary

**Usage:**
```bash
scripts\health_check.bat
```

#### `restart.bat` - **Clean Restart**
- 🛑 Stops all running processes
- 🧹 Clears temporary files and caches
- 🔄 Starts fresh servers
- ✨ Clean slate for troubleshooting

**Usage:**
```bash
scripts\restart.bat
```

## 🎯 **Why These Scripts Matter**

### **🚀 Developer Productivity**
- **One-Command Setup** - New developers can start immediately
- **Quick Launch** - No need to remember multiple commands
- **Easy Troubleshooting** - Health checks and clean restarts

### **👥 Team Collaboration**
- **Consistent Environment** - Everyone uses the same setup
- **Reduced Onboarding** - Simple instructions for new team members
- **Standard Workflows** - Common tasks are automated

### **🔧 Maintenance Benefits**
- **Automated Cleanup** - Handles cache and temporary files
- **Process Management** - Properly stops and starts services
- **System Monitoring** - Quick health status checks

## 📖 **Usage Patterns**

### **🎯 First Time Setup:**
```bash
1. scripts\setup.bat          # Install everything
2. scripts\start_servers.bat  # Launch the application
```

### **🔄 Daily Development:**
```bash
scripts\start_servers.bat     # Start your work session
scripts\health_check.bat      # Check if everything is working
scripts\restart.bat           # Clean restart if issues occur
```

### **🚨 Troubleshooting:**
```bash
1. scripts\health_check.bat   # Diagnose the problem
2. scripts\restart.bat        # Try a clean restart
3. scripts\setup.bat          # Reinstall if needed
```

## 🎉 **Benefits Summary**

The scripts folder provides:
- ✅ **Simplified Development** - Complex tasks become one-command operations
- ✅ **Consistent Environment** - Everyone follows the same procedures
- ✅ **Quick Troubleshooting** - Automated diagnosis and fixes
- ✅ **Professional Workflow** - Industry-standard automation

These scripts transform a complex multi-service application into something that's easy to manage and maintain!

---

**💡 Tip**: Always run scripts from the project root directory for best results!
