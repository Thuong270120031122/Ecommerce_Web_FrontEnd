import { Button, Grid, Link, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <div>
      <Grid
        className="bg-black text-white text-center mt-10 "
        container
        sx={{ bgcolor: "black", color: "white", py: 3 }}
        rowGap={{ sm: 10 }}
      >
        <Grid sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Company
          </Typography>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Blog
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              About
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Press
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Jobs
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Partners
            </Button>
          </div>
        </Grid>

        <Grid sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Solutions
          </Typography>

          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Analytics
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Marketing
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Commerce
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Insights
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Support
            </Button>
          </div>
        </Grid>

        <Grid sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Documentation
          </Typography>

          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Guides
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              API Status
            </Button>
          </div>
        </Grid>

        <Grid sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Legal
          </Typography>

          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Claim
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Privicy
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Term
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid>
        <Grid className="pt-20" item xs={12}>
          <Typography variant="body2" component="p" align="center">
            &copy: 2024 My Company. All right s reserved.
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Made with love by FatBlue-Cat.
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Icon made by{" "}
            <Link
              href="https://www.freepik.com"
              color="inherit"
              underline="always"
            >
              Freepik
            </Link>{" "}
            from{" "}
            <Link href="#" color="inherit" underline="always">
              www.flaticon.com
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
